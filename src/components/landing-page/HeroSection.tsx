import React from 'react'
import { AnimatedGradientText } from '../magicui/animated-gradient-text'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Marquee } from '../magicui/marquee';
import img1 from "@/public/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg";
import img2 from "@/public/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg";
import img3 from "@/public/hero-images/Confident Woman in Red Outfit.jpeg";
import img4 from "@/public/hero-images/Confident Woman in Urban Setting.jpeg";
import img5 from "@/public/hero-images/Futuristic Helmet Portrait.jpeg";
import img6 from "@/public/hero-images/Futuristic Woman in Armor.jpeg";
import img7 from "@/public/hero-images/Man in Brown Suit.jpeg";
import img8 from "@/public/hero-images/Poised Elegance of a Young Professional.jpeg";
import img9 from "@/public/hero-images/Professional Business Portrait.jpeg";
import img10 from "@/public/hero-images/Professional Woman in Navy Blue Suit.jpeg";
import img11 from "@/public/hero-images/Sophisticated Businessman Portrait.jpeg";
import Image from 'next/image';

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
const Images = [
    {
      src: img1,
      alt: "AI generated image",
    },
    {
      src: img2,
      alt: "AI generated image",
    },
    {
      src: img3,
      alt: "AI generated image",
    },
    {
      src: img4,
      alt: "AI generated image",
    },
    {
      src: img5,
      alt: "AI generated image",
    },
    {
      src: img6,
      alt: "AI generated image",
    },
    {
      src: img7,
      alt: "AI generated image",
    },
    {
      src: img8,
      alt: "AI generated image",
    },
    {
      src: img9,
      alt: "AI generated image",
    },
    {
      src: img10,
      alt: "AI generated image",
    },
    {
      src: img11,
      alt: "AI generated image",
    },
  ];
const MarqueeColumn = ({reverse, duration, className}: {reverse?: boolean, duration: string, className?: string}) => {
    return <Marquee reverse={reverse} pauseOnHover vertical className={cn("flex flex-col items-center justify-center w-full relative h-full", className)}
        style={{
            "--duration": duration,
        } as React.CSSProperties}
    >
      {Images.sort(() => Math.random() - 0.5).map((image, index) => {
        return <Image key={index} src={image.src} alt={image.alt} priority className='object-cover w-full h-full rounded opacity-[.25] 
        hover:opacity-100 transition-opacity duration-300 ease-in-out'/>

      }
        
      )}
  </Marquee>
}

const HeroSection = () => {
  return (
    <section className='w-full relative overflow-hidden min-h-screen flex flex-col items-center justify-center'>
        <div className='relative w-fit px-6 xs:px-8 mx-auto flex flex-col items-center justify-center space-y-4 text-center z-40 backdrop-blur-[5px]'>
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
      <h1 className='text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
        AI Powered Photo Generation
      </h1>

      <p className='mx-auto max-w-3xl text-sm lg:text-xl sm:text-md xs:text-base mb-8 text-gray-600'>
      From professional headshots to stunning social media posts, PhotoForge AI makes you look your best — effortlessly create, edit, and generate captivating images in seconds!
      </p>
      <div className='flex items-center space-x-2 mb-4'>
          <div className='flex items-center -space-x-5 sm:-space-x-4 overflow-hidden'>
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

        <div className='absolute top-0 w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 z-10'>
          <MarqueeColumn reverse={true} duration='120s'/>
          <MarqueeColumn reverse={false} duration='120s'/>
          <MarqueeColumn reverse={true} duration='120s'/>
          <MarqueeColumn reverse={false} duration='120s' className='hidden md:flex'/>
          <MarqueeColumn reverse={true} duration='120s' className='hidden lg:flex'/>
          <MarqueeColumn reverse={false} duration='120s' className='hidden lg:flex'/>
          

        </div>
    </section>
  )
}

export default HeroSection