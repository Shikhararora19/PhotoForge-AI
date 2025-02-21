"use client"
import React, { useId, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { changePassword } from '@/app/actions/auth-actions'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'

const passwordValidationRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')


const formSchema = z.object({
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

const ChangePasswordForm = ({className}:{className?: string}) => {

    const toastId = useId();
    const [loading, setLoading] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          password: "",
            confirmPassword: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.loading('Changing Password...', {id: toastId})
        setLoading(true)

        try{
        const{success, error} = await changePassword(values.password) 

        if(success){
            toast.success('Changed Password Successfully!', {id: toastId})
            setLoading(false)
            redirect('/login')
        }
        else{
            toast.error(String(error), {id: toastId})
            redirect('/login')
        }
    }catch(error: any){
        toast.error(error?.message || "There was an error changing password", {id: toastId})

    }finally{
        setLoading(false)
    }
}
     
  return (
    <div className={cn('grid gap-6', className)}>
        <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
            Change Password
        </h1>
        <p className='text-sm text-muted-foreground'>
            Enter yor new password belowmto change/update your password.
        </p>
      </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormDescription>
                Password must contain at least 8 charachters, one uppercase letter, one lowercase letter, one number and one special character
              </FormDescription>
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
                <Input type="password" placeholder="Enter your password again" {...field} />
              </FormControl>
                <FormDescription>
                    Please confirm your password
                </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <Button type="submit"className='w-full py-4' disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin'/>}
            {loading ? 'Changing Password...' : 'Change Password'}
            </Button>
            <div className='text-center text-sm text-muted-foreground'>
                Make sure to remember your new password
            </div>
      </form>
    </Form>
    </div>
  )
}

export default ChangePasswordForm