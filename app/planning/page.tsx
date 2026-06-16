'use client'

import DataTable from "./components/DataTable";

import Add from './components/Add';

import { useEffect, useState } from "react";

import { IPlanningDaySchema, IPlanningTaskSchema } from "../actions/type";

import * as API from "../actions/api";

import { v4 as ID } from 'uuid'



const notesToNewTasks = (notes: string): IPlanningTaskSchema[] =>

    notes

        .split('\n')

        .map(line => line.trim())

        .filter(Boolean)

        .map(text => ({

            id: ID(),

            text,

            completed: null,

            description: null,

        }));



const notesToTasks = (notes: string, existingTasks: IPlanningTaskSchema[]): IPlanningTaskSchema[] => {

    const lines = notes.split('\n').map(l => l.trim()).filter(Boolean);

    const existingByText = new Map(existingTasks.map(t => [t.text, t]));

    return lines.map(text =>

        existingByText.get(text) ?? {

            id: ID(),

            text,

            completed: null,

            description: null,

        }

    );

};



const resolveReviewedAt = (tasks: IPlanningTaskSchema[], previous: Date | null): Date | null => {

    if (tasks.length === 0) return null;

    if (tasks.some(t => t.completed === null)) return null;

    return previous ?? new Date();

};



const mergeByDate = (list: IPlanningDaySchema[]): IPlanningDaySchema[] => {

    const byDate = new Map<string, IPlanningDaySchema>();



    for (const day of list) {

        const existing = byDate.get(day.date);

        if (!existing) {

            byDate.set(day.date, { ...day, tasks: [...day.tasks] });

            continue;

        }

        existing.tasks = [...existing.tasks, ...day.tasks];

        if (new Date(day.createdAt).getTime() < new Date(existing.createdAt).getTime()) {

            existing.createdAt = day.createdAt;

        }

        existing.reviewedAt = resolveReviewedAt(existing.tasks, existing.reviewedAt ?? day.reviewedAt);

    }



    return Array.from(byDate.values()).sort(

        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

    );

};



export default function Planning() {

    const [planningList, setPlanningList] = useState<IPlanningDaySchema[]>([]);



    useEffect(() => {

        const fetch = async () => {

            const res = await API.getPlanningList();

            const merged = mergeByDate(res);

            setPlanningList(merged);

            if (merged.length !== res.length) {

                await API.savePlanningList(merged);

            }

        }

        fetch()

    }, [])



    const saveList = async (list: IPlanningDaySchema[]) => {

        setPlanningList(list);

        await API.savePlanningList(list);

    };



    const addPlan = async (date: string, notes: string) => {

        const newTasks = notesToNewTasks(notes);

        if (newTasks.length === 0) return;



        const existing = planningList.find(d => d.date === date);



        if (existing) {

            const updated: IPlanningDaySchema = {

                ...existing,

                tasks: [...existing.tasks, ...newTasks],

                reviewedAt: resolveReviewedAt([...existing.tasks, ...newTasks], existing.reviewedAt),

            };

            const _list = planningList.map(d => d.id === existing.id ? updated : d);

            await saveList(_list);

            return;

        }



        const day: IPlanningDaySchema = {

            id: ID(),

            date,

            tasks: newTasks,

            createdAt: new Date(),

            reviewedAt: null,

        };



        await saveList([day, ...planningList]);

    };



    const onEdit = async (dayId: string, notes: string) => {

        const day = planningList.find(d => d.id === dayId);

        if (!day) return;



        const tasks = notesToTasks(notes, day.tasks);

        if (tasks.length === 0) return;



        const updated: IPlanningDaySchema = {

            ...day,

            tasks,

            reviewedAt: resolveReviewedAt(tasks, day.reviewedAt),

        };



        const _list = planningList.map(d => d.id === dayId ? updated : d);

        await saveList(_list);

    };



    const onReview = async (updated: IPlanningDaySchema) => {

        const _list = planningList.map(day =>

            day.id === updated.id ? updated : day

        );

        await saveList(_list);

    };



    const onDelete = async (id: string) => {

        const _list = planningList.filter(day => day.id !== id);

        await saveList(_list);

    };



    return (

        <section className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">

                <div>

                    <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent uppercase">

                        Daily Planning

                    </h1>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">

                        Add notes anytime during the day. Review and mark completion each night.

                    </p>

                </div>

                <div>

                    <Add addPlan={addPlan} />

                </div>

            </div>



            <div className="mb-8">

                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">Plan History</p>

                {planningList.length === 0 ? (

                    <div className="text-center py-12 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">

                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">

                            No plans yet. Click <strong>Day Plan</strong> to add today&apos;s notes.

                        </p>

                    </div>

                ) : (

                    <DataTable list={planningList} onDelete={onDelete} onReview={onReview} onEdit={onEdit} />

                )}

            </div>

        </section>

    );

}


