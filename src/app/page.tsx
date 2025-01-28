"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import Image from "next/image";


import { useState } from "react";
export default function Home() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="min-h-screen bg-[#310D4D]">
      <header className="sticky top-0 z-20 flex items-center justify-center p-4 backdrop-blur-[2px] border-b border-gray-800">
        <img src="/temp_logo.png" alt="Fanfantasy.ai Logo" className="h-8" />
      </header>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 md:p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center text-center z-10">
          <AnimatedGradientText>
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-transparent" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Introducing fanfantasy.ai
            </span>
          </AnimatedGradientText>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-white">
            your fantasy, realized.
          </h1>

          <div className="flex gap-4 items-center flex-col">
            {success ? (
              <p className="text-white">Thank you for signing up!</p>
            ) : (
              <form onSubmit={handleSubmit} className="bg-transparent border border-gray-400 py-4 md:py-2 pl-3 md:pl-4 pr-3 md:pr-2 rounded-3xl flex flex-col sm:flex-row sm:items-center gap-4 w-[500px] max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent outline-none text-white w-full"
                />
                <RainbowButton className="w-full md:w-[60%]">Join waitlist</RainbowButton>
              </form>
            )}
          </div>
        </main>
        <div className="fixed inset-0">
          <FlickeringGrid
            className="absolute inset-0 z-0 size-full"
            squareSize={1}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.8}
            flickerChance={0.1}
            height={1200}
            width={1920}
          />
        </div>
      </div>
    </div>
  );
}
