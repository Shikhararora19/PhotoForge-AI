import React from 'react'
import AuthIMg from '@/public/Abstract Curves and Colors.jpeg'
import Image from 'next/image'
import Logo from '@/components/ui/Logo'
import AuthForm from '@/components/authentication/AuthForm'



const ResetPasswordPage = async () => {

  return (
    <main className='h-screen grid grid-cols-2 relative'>
        <div className='relative w-full flex flex-col bg-muted p-10 text-primary-foreground'>
            <div className='w-full h-[30%] bg-gradient-to-t from-transparent to-black/50 absolute top-0 left-0 z-10'/>
            <div className='w-full h-[40%] bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 z-10'/>
            <Image src={AuthIMg} alt='Login Image' fill className='w-full h-full object-cover'/>
            <div className='relative flex items-center z-20'>
            <Logo />
            </div>
            <div className='relative z-20 mt-auto'>
                <blockquote className='space-y-2'>
                    <p className='text-lg'>
                    &ldquo;PhotoForge AI is a game-changer! It has completely transformed the way I create professional headshots. In just minutes, I can generate stunning, high-quality portraits—saving me hours of editing and expensive photography costs. This is the future of AI-powered photography!&rdquo;
                    </p>
                    <footer className='text-sm'>David S.</footer>
                </blockquote>
            </div>
            
        </div>
        <div className='relative flex flex-col items-center justify-center p-8 h-full w-full'>

           <div className='w-[350px] max-w-xl mx-auto'>
            ChangePasswordForm
           </div>
        </div>

    </main>
  )
}

export default AuthenticationPage