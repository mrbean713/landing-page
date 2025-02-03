"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from 'next/image';
import { BackgroundLines } from "@/components/ui/background-lines";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

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

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  const testimonials = [
    {
      src:  "/baddieSeven.jpg",
    },
    {
      src:  "/baddieSeven.jpg",
    },
    {
      src:  "/baddieSeven.jpg",
    },
    {
      src:  "/baddieSeven.jpg",
    },
    {
      src:  "/baddieSeven.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#310D4D]">
      <header className="absolute top-0 w-full z-20 flex items-center justify-center py-6 backdrop-blur-[2px] bg-gradient-to-b from-[#310D4D] to-transparent">
        <img src="/temp_logo.png" alt="Fanfantasy.ai Logo" className="h-8" />
      </header>
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Add gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#310D4D] z-0" />
        
        {/* Background Lines */}
        <BackgroundLines className="absolute inset-0 bg-[#6B7280]">
          {/* Empty div to allow BackgroundLines to render its SVG */}
          <div />
        </BackgroundLines>

        {/* <div className="absolute inset-0">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={1}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.8}
            flickerChance={0.1}
          />
        </div> */}
       

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
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
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-white mt-6">
            Your superfans&apos; fantasies, realized.
          </h1>
          <p className="text-white mt-6 text-lg max-w-2xl mx-auto">
            Fan Fantasy helps creators monetize their brand and scale their businesses. Empower your creators to 10x their earnings through AI chat and video.
          </p>

          <div className="mt-10">
            {success ? (
              <p className="text-white">Thank you for signing up!</p>
            ) : (
              <form onSubmit={handleSubmit} className="bg-transparent border border-gray-400 py-4 md:py-2 pl-3 md:pl-4 pr-3 md:pr-2 rounded-3xl flex flex-col sm:flex-row sm:items-center gap-4 w-[500px] max-w-md mx-auto">
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
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20">
        <Carousel items={cards} />
      </section>

      {/* add section*/}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-xl tracking-tight">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Subscription Platform{" "}
              <span className="block">
                Built For{" "}
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
                  Creators
                </span>
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Build community or connect with fans individually with customizable memberships. 
              Limit DMs, grant access to certain posts, offer live streams or calls and create 
              exclusive memberships.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-full border border-gray-300 text-white hover:border-gray-400 transition-colors">
                Learn More
              </button>
              <button className="px-6 py-3 rounded-full bg-white text-[#310D4D] hover:bg-gray-100 transition-colors">
                Get Access
              </button>
            </div>
          </div>
          <div className="flex-1">
            <AnimatedTestimonials testimonials={testimonials} />
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 py-40">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center text-white leading-tight tracking-tighter">
            We provide the tools for agencies & creatives to scale their business and{' '}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              make fan fantasies come true.
            </span>
          </h2>
        </div>
      </section>
      <section>
        <TextHoverEffect text="FANFANTASY" />
      </section>
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
 
const data = [
  {
    category: "age 25",
    title: "Valentina",
    src: "/baddieOne.jpg",
    content: <DummyContent />,
  },
  {
    category: "age 22",
    title: "Hailey",
    src: "/baddieTwo.jpg",
    content: <DummyContent />,
  },
  {
    category: "age 24",
    title: "Aika",
    src: "/baddieThree.jpg",
    content: <DummyContent />,
  },
  {
    category: "age 22",
    title: "Gabriela",
    src: "/baddieFour.jpg",
    content: <DummyContent />,
  },
  {
    category: "age 24",
    title: "Imani",
    src: "/baddieFive.jpg",
    content: <DummyContent />,
  },
  {
    category: "age 23",
    title: "Isabella",
    src: "/baddieSix.jpg",
    content: <DummyContent />,
  },
  {
    category: "age 20",
    title: "Soo-min",
    src: "/baddieSeven.jpg",
    content: <DummyContent />,
  },
  {
    category: "age 23",
    title: "Annika",
    src: "/baddieEight.jpg",
    content: <DummyContent />,
  },
];
