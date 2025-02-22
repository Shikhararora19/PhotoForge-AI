import React from 'react'
import { AnimatedGradientText } from '../magicui/animated-gradient-text'
import { cn } from '@/lib/utils'

const Faqs = () => {
  return (
    <section id='faqs' className='w-full py-32 flex flex-col items-center justify-center overflow-hidden'>
                <AnimatedGradientText className='bg-background backdrop-blur-0'>
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                  )}
                >
                    FAQs
                </span>
              </AnimatedGradientText>
              <h2 className='subHeading mt-4'>Frequently Asked Questions</h2>
              <p className='subText mt-4 text-center'>Here are some of the most frequently asked questions about our product.</p>
    </section>
  )
}

export default Faqs