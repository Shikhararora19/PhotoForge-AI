"use client"
import React, { useId, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { signup } from '@/app/actions/auth-actions'
import { redirect } from 'next/navigation'


const passwordValidationRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')

const formSchema = z.object({
    fullName: z.string().min(3, {
        message: "Name must be at least 3 characters",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password must be at least 8 characters",
    }).regex(passwordValidationRegex, {
        message: "Password must contain at least 8 charachters, one uppercase letter, one lowercase letter, one number and one special character",
    }),
    confirmPassword: z.string({
        required_error: "Confirm Password is required",
    })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })



const SignupForm = ({className}:{className?: string}) => {

    const [loading, setLoading] = useState(false)

    const toastId = useId();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.loading('Signing up...', {id: toastId})
        setLoading(true)

        const formData = new FormData()
        formData.append('fullName', values.fullName)
        formData.append('email', values.email)
        formData.append('password', values.password)

        const{success, error} = await signup(formData) 

        if(success){
            toast.success('Account created successfully! Please confirm your email', {id: toastId})
            setLoading(false)
            redirect('/login')
        }
        else{
            toast.error(String(error), {id: toastId})
        }

       
        console.log(values)
        }
     
  return (
    <div className={cn('grid gap-6', className)}>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"className='w-full' disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin'/>}
            Sign up</Button>
      </form>
    </Form>
    </div>
  )
}

export default SignupForm