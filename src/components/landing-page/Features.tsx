import React from 'react'
import { AnimatedGradientText } from '../magicui/animated-gradient-text'
import { cn } from '@/lib/utils'
import { ImageUpscaleIcon, PlayCircle, SquareStackIcon } from 'lucide-react';
import Image from 'next/image';
import dashBoardImg from '@/public/dashboard-img.png'

const featuresList = [
    {
      title: "AI-Powered Photo Perfection",
      description: "Elevate your photos with lifelike quality using cutting-edge AI. Whether you're creating eye-catching social media content, professional LinkedIn headshots, or unique personal projects, PhotoForge AI delivers stunning results in seconds.",
      icon: <ImageUpscaleIcon className='w-8 h-8' strokeWidth={1.5}/>
    },
    {
      title: "Diverse Photo Packs for Every Style",
      description: "Access a wide range of photo packs designed for different aesthetics, occasions, and platforms. Whether it's vibrant social media shots, sleek corporate portraits, or playful creative projects, you'll find the perfect look instantly.",
      icon: <SquareStackIcon className='w-8 h-8' strokeWidth={1.5}/>
    },
    {
      title: "Customizable Photo Generation Made Simple",
      description: "Tailor your images with easy-to-use customization options. Adjust styles, backgrounds, and details to create photos that match your vision — no design skills required. With PhotoForge AI, creativity is just a click away.",
      icon: <PlayCircle className='w-8 h-8' strokeWidth={1.5}/>
    }
  ];

const Features = () => {
  return (
    <section id='features' className='w-full bg-muted py-32 flex flex-col items-center justify-center'>
        <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative bg-muted px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto'>
        <div className='col-span-full space-y-4'>
        <AnimatedGradientText className='ml-0 bg-background backdrop-blur-0'>
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
            Features
        </span>
      </AnimatedGradientText>
      <h2 className='text-2xl sm:text-4xl xs:text-3xl font-bold'>Unlock Unlimited Possibilities with PhotoForge AI</h2>
      <p className='text-base text-muted-foreground lg:max-w-[75%]'>Transform the way you create and enhance images with our advanced AI-powered platform. From intuitive editing tools to stunning image generation, PhotoForge AI empowers you to bring your ideas to life effortlessly.</p>

        </div>

        <div className='flex flex-col justify-start items-start order-2 lg:order-1'>
            {featuresList.map((feature) => {

                return <div key={feature.title} className='felx items-start gap-2 sm:gap-4 rounded-lg py-8 lg:p-12'>
                    <span className='p-0 sm:p-2 rounded-md'>
                        {feature.icon}
                    </span>
                    <div>
                        <h3 className='text-xl sm:text-2xl font-semibold'>{feature.title}</h3>
                        <p className='text-sm xs:text-base text-muted-foreground pt-2'>{feature.description}</p>
                        </div>

                    </div>
            })}

        </div>
            <div className={cn('h-fit lg:sticky top-32 pl-16 pt-16 rounded-lg border border-r-gray-300 border-b-gray-300 bg-background backdrop-blur-0 animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] [--bg-size:400%] order-1 lg:order-2')}>
                <Image src={dashBoardImg} alt='Dashboard Image' className='w-full h-auto rouned-lg'/>
            </div>

        </div>
    </section>
  )
}

export default Features