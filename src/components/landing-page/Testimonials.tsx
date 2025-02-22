import React from 'react'
import { AnimatedGradientText } from '../magicui/animated-gradient-text'
import { cn } from '@/lib/utils'
import { Marquee } from '../magicui/marquee';
import avatar1 from "@/public/avatars/AutumnTechFocus.jpeg";
import avatar2 from "@/public/avatars/Casual Creative Professional.jpeg";
import avatar3 from "@/public/avatars/Golden Hour Contemplation.jpeg";
import avatar4 from "@/public/avatars/Portrait of a Woman in Rust-Colored Top.jpeg";
import avatar5 from "@/public/avatars/Radiant Comfort.jpeg";
import avatar6 from "@/public/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg";
import Image, { StaticImageData } from 'next/image';

const reviews = [
    {
      name: "Jack Smith",
      username: "@jacksmith",
      body: "PhotoForge AI transformed my dating profile photos and boosted my matches significantly. Total game changer!",
      img: avatar1,
    },
    {
      name: "Jill Smith",
      username: "@jillsmith",
      body: "Blown away by the results! The quality exceeded my expectations — absolutely incredible!",
      img: avatar2,
    },
    {
      name: "John Doe",
      username: "@johndoe",
      body: "Using PhotoForge AI for my LinkedIn profile was a game changer. The professional quality helped me land multiple job offers!",
      img: avatar3,
    },
    {
      name: "Jane Doe",
      username: "@janedoe",
      body: "Thrilled with the results! PhotoForge AI is simply phenomenal — I can't recommend it enough!",
      img: avatar4,
    },
    {
      name: "Jenny Mandell",
      username: "@jennymandell",
      body: "I'm beyond impressed with the quality. PhotoForge AI exceeded my expectations and then some!",
      img: avatar5,
    },
    {
      name: "James Cameron",
      username: "@jamescameron",
      body: "Amazed by how professional my photos look. PhotoForge AI is perfect for anyone looking to elevate their profile!",
      img: avatar6,
    },
  ];
  
   
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
   
  const ReviewCard = ({
    img,
    name,
    username,
    body,
  }: {
    img: StaticImageData;
    name: string;
    username: string;
    body: string;
  }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-8 flex flex-col justify-between",
          // light styles
          "border-primary/[.15] bg-muted/70 hover:bg-muted/80",
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <Image className="rounded-full aspect-square" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    );
  };
   

const Testimonials = () => {


    
  return (
    <section id='testimonials' className='w-full py-32 flex flex-col items-center justify-center overflow-hidden'>
            <AnimatedGradientText className='bg-background backdrop-blur-0'>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
                Testimonials
            </span>
          </AnimatedGradientText>
          <h2 className='subHeading mt-4'>What Our Users Say</h2>
          <p className='subText mt-4 text-center'>Join a community of creators who trust PhotoForge AI for effortless, high-quality photo generation — from professional LinkedIn headshots to vibrant social media content.</p>

          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-16">
      <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem] sm:[--gap:2rem]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s] [--gap:1rem] sm:[--gap:2rem] mt-1 sm:mt-4">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 sm:w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 sm:w-1/4 bg-gradient-to-l from-background"></div>
    </div>
    
            </section>

  )
}

export default Testimonials