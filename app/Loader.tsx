'use client'
import { useEffect, useState } from "react";

export function Loader() {

  const [count, setCount] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((pCount) => pCount.length == 3 ? '' : pCount + '.')
    }, 100)
    return () => clearInterval(interval)
  }, [])
  return (
    <section className="w-full flex justify-center items-center mt-3">
      <div>Loading {count}</div>
    </section>
  );
};