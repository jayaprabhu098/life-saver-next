'use client';
import { FaHome } from "react-icons/fa";
import { AiOutlineAppstore } from "react-icons/ai";
import { FaChartSimple } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaHeartCircleCheck } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function Menu() {
    const pathname = usePathname();

    const getColor = (path: string) => {
        return pathname === path
            ? 'bg-cyan-400'
            : '';
    };

    return (
        <section className="flex justify-center p-2 bg-slate-500">
            <div className="w-60 flex justify-evenly">
                <Link href="/home" className={`rounded w-12 h-8 pl-4 pt-2 cursor-pointer ${getColor('/home')}`}>
                    <FaHome />
                </Link>
                <Link href='/category?'
                    className={`rounded w-12 h-8 pl-4 pt-2 cursor-pointer ${getColor('/category')}`}
                >
                    <AiOutlineAppstore />
                </Link>
                <Link
                    className={`rounded w-12 h-8 pl-4 pt-2 cursor-pointer ${getColor('/account')}`}
                    href='/account'
                >
                    <FaChartSimple />
                </Link>
                <Link
                    className={`rounded w-12 h-8 pl-4 pt-2 cursor-pointer ${getColor('/health')}`}
                    href='/health?'
                >
                    <FaHeartCircleCheck />
                </Link>
                <Link
                    className={`rounded w-12 h-8 pl-4 pt-2 cursor-pointer ${getColor('/profile')}`}
                    href='/profile'
                >
                    <FaUser />
                </Link>
            </div>
        </section >
    );
};