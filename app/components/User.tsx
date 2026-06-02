
'use client';
import { ChangeEvent } from "react";

interface IUser {
    user: number,
    setUser: (user: number) => void
}

export default function User(props: IUser) {

    const availableUsers = [
        { id: 0, name: 'Personal' },
        { id: 1, name: 'Home' },
    ]

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setUser(Number(e.target.value))
    }

    return (
        <div className="relative inline-block mr-6">
            <select
                onChange={onChange}
                value={props.user}
                className="appearance-none text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-4 pr-10 py-2 text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            >
                {availableUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name} Account
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    );
}

