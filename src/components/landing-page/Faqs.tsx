import React from 'react'
import { AnimatedGradientText } from '../magicui/animated-gradient-text'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const faqsList = [
    {
      question: "How does PhotoForge AI work?",
      answer: "PhotoForge AI uses advanced machine learning algorithms to analyze your photos and generate realistic, personalized images based on your unique features and chosen scenarios."
    },
    {
      question: "Is my data safe with PhotoForge AI?",
      answer: "Yes! We prioritize your data privacy. All uploaded photos and generated images are encrypted and securely stored. We never share your data with third parties without your explicit consent."
    },
    {
      question: "How many photos should I upload for the best results?",
      answer: "For optimal results, upload 10-20 diverse photos showing different angles and expressions. This helps our AI model capture your unique features for more realistic images."
    },
    {
      question: "Can I use PhotoForge AI images for commercial purposes?",
      answer: "Absolutely! Our Pro and Enterprise plans include commercial usage rights for all generated images. Just make sure to respect copyright and privacy laws when using the content."
    },
    {
      question: "How often is the AI model updated?",
      answer: "We continuously improve our AI model to provide the best results. Major updates are released quarterly, while minor improvements are rolled out more frequently. All users receive these updates automatically."
    },
    {
      question: "What’s the difference between the free and paid plans?",
      answer: "The free plan lets you generate up to 5 images per day. The Pro plan offers unlimited image generation, higher resolution outputs, and advanced features. The Enterprise plan is designed for businesses, offering custom integrations and dedicated support."
    }
  ];

  const Question = ({ question, answer }: {question:string, answer:string }) => {
    return <AccordionItem value={question}>
        <AccordionTrigger className='text-left' >{question}</AccordionTrigger>
        <AccordionContent className='text-muted-foreground'>{answer}</AccordionContent>
    </AccordionItem>
  }
  
const Faqs = () => {
  return (
    <section id='faqs' className='w-full py-32 px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto flex flex-col items-center justify-center overflow-hidden'>
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

              <Accordion type='single' collapsible className='w-full max-w-4xl mx-auto mt-16'>
                {
                    faqsList.map((faq) => {
                        return <Question key={faq.question} question={faq.question} answer={faq.answer}/>
                    })
                }
              </Accordion>
    </section>
  )
}

export default Faqs