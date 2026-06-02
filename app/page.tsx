import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-4rem)] px-4 py-8 overflow-hidden bg-gradient-to-b from-zinc-500/5 via-transparent to-transparent">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
        <div className="relative p-2 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-3xl shadow-2xl backdrop-blur-sm border border-zinc-200/20 dark:border-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.02]">
          <Image 
            src="/home_logo.jpg" 
            width={300} 
            height={300} 
            alt="Life Saver Logo" 
            priority={true} 
            className="rounded-2xl object-cover mix-blend-luminosity dark:mix-blend-normal"
            style={{ width: "auto", height: "auto" }} 
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-8 mb-3 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent uppercase">
          Take Control Of Your Finances
        </h1>
        
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-md mt-2 font-medium leading-relaxed">
          Effortlessly budget, save, and spend wisely with our all-in-one financial dashboard.
        </p>

        <div className="mt-8">
          <Link 
            href="./home" 
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
