import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <section className='flex flex-col items-center justify-center text-center h-screen'>
      <Image src='/home_logo.jpg' width={300} height={0} alt="Loading..." priority={true} style={{ width: "auto", height: "auto" }} />
      <p className='text-3xl mt-4'>TAKE CONTROL OF YOUR FINANCES</p>
      <p className='text-sm mt-2'>
        Effortlessly budget, save, and spend wisely with our all-in-one app
      </p>
      <Link href="./home" className='w-32 h-8 pt-1 mt-5 bg-blue-600 text-white rounded-md'>Get Started</Link>
    </section>
  );
}
