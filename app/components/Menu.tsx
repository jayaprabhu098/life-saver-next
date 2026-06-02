'use client';
import { AiOutlineAppstore } from "react-icons/ai";
import { FaChartSimple, FaHeartCircleCheck } from "react-icons/fa6";
import { FaUser, FaChartPie, FaHome } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function Menu() {
    const pathname = usePathname();

    const getActiveStyle = (path: string) => {
        return pathname === path
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-105'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60';
    };

    return (
        <header className="sticky top-0 z-[100] w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 transition-all duration-300">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
                <Link href="/home" className="flex items-center gap-2 cursor-pointer">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent font-extrabold text-xl tracking-wider">
                        LIFE SAVER
                    </span>
                </Link>
                
                <nav className="flex items-center gap-1.5">
                    <Link href="/home" title="Home" className={`flex items-center justify-center rounded-xl w-10 h-10 cursor-pointer transition-all duration-200 ${getActiveStyle('/home')}`}>
                        <FaHome className="w-5 h-5" />
                    </Link>
                    <Link href='/category?' title="Categories" className={`flex items-center justify-center rounded-xl w-10 h-10 cursor-pointer transition-all duration-200 ${getActiveStyle('/category')}`}>
                        <AiOutlineAppstore className="w-5 h-5" />
                    </Link>
                    <Link href='/account' title="Transactions" className={`flex items-center justify-center rounded-xl w-10 h-10 cursor-pointer transition-all duration-200 ${getActiveStyle('/account')}`}>
                        <FaChartSimple className="w-5 h-5" />
                    </Link>
                    <Link href='/chart' title="Analytics" className={`flex items-center justify-center rounded-xl w-10 h-10 cursor-pointer transition-all duration-200 ${getActiveStyle('/chart')}`}>
                        <FaChartPie className="w-5 h-5" />
                    </Link>
                    <Link href='/health?' title="Weight Tracker" className={`flex items-center justify-center rounded-xl w-10 h-10 cursor-pointer transition-all duration-200 ${getActiveStyle('/health')}`}>
                        <FaHeartCircleCheck className="w-5 h-5" />
                    </Link>
                    <Link href='/profile' title="Savings Target" className={`flex items-center justify-center rounded-xl w-10 h-10 cursor-pointer transition-all duration-200 ${getActiveStyle('/profile')}`}>
                        <FaUser className="w-5 h-5" />
                    </Link>
                </nav>
            </div>
        </header>
    );
};