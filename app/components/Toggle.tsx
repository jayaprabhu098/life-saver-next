
'use client';

interface IToggle {
    type: number,
    setType: (type: number) => void
}
export default function Toggle(props: IToggle) {

    return (
        <div className="flex justify-center mt-6 mb-2">
            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-2xl flex gap-1 shadow-sm">
                <button
                    type="button"
                    onClick={() => props.setType(1)}
                    className={`px-6 py-2 text-sm font-bold rounded-xl cursor-pointer transition-all duration-300 ${
                        props.type === 1
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                >
                    Expenses
                </button>
                <button
                    type="button"
                    onClick={() => props.setType(2)}
                    className={`px-6 py-2 text-sm font-bold rounded-xl cursor-pointer transition-all duration-300 ${
                        props.type === 2
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                >
                    Income
                </button>
            </div>
        </div>
    );
}
