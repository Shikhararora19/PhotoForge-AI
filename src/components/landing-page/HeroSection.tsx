import React from 'react'
import { AnimatedGradientText } from '../magicui/animated-gradient-text'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { Button } from '../ui/button';

const avatars = [
    {
      src: "/avatars/AutumnTechFocus.jpeg",
      fallback: "CN",
    },
    {
      src: "/avatars/Casual Creative Professional.jpeg",
      fallback: "AB",
    },
    {
      src: "/avatars/Golden Hour Contemplation.jpeg",
      fallback: "FG",
    },
    {
      src: "/avatars/Portrait of a Woman in Rust-Colored Top.jpeg",
      fallback: "PW",
    },
    {
      src: "/avatars/Radiant Comfort.jpeg",
      fallback: "RC",
    },
    {
      src: "/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg",
      fallback: "RB",
    },
  ];
  

const HeroSection = () => {
  return (
    <section className='w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center'>
        <div className='relative w-fit mx-auto flex flex-col items-center justify-center space-y-4 text-center z-40 backdrop-blur-[5px]'>
        <AnimatedGradientText>
        🫡 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
            Welcome to Photo Forge AI
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
      <h1 className='text-6xl font-extrabold tracking-tighter'>
        AI Powered Photo Generation
      </h1>

      <p className='mx-auto max-w-3xl text-xl mb-8 text-gray-600'>
      From professional headshots to stunning social media posts, PhotoForge AI makes you look your best — effortlessly create, edit, and generate captivating images in seconds!
      </p>
      <div className='flex items-center space-x-2 mb-4'>
          <div className='flex items-center -space-x-4 overflow-hidden'>
          {
            avatars.map((avatar,index) => {
                return <Avatar key={index} className='inline-block border-2 border-background'>
                    <AvatarImage src={avatar.src} className='h-full object-cover'/>
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>


                </Avatar>

            }
            )
          }
          </div>
          <span className="text-xs text-gray-600 block text-center mt-2">Trusted and loved by creators worldwide.</span>


      </div>
      <Link href="/login?state=signup">
      <Button className='rounded-md text-base h-12'>
        🤖 Create your first AI model 🤖
      </Button>
          </Link>
        </div>
    </section>
  )
}

export default HeroSection