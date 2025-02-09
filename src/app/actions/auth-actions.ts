'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';

interface AuthResponse {
    error: null|string,
    success: boolean,
    data: unknown|null,
}




export async function signup(formData: FormData): Promise<AuthResponse>{
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options:{
            data: {
                full_name: formData.get('fullName') as string,
            }
        }
    }

    const { data: signupData, error } = await supabase.auth.signUp(data);

    return{
        error: error?.message || "there was an error signing up",
        success: !error,
        data: signupData||null,
    }
}

export async function login(formData: FormData): Promise<AuthResponse>{
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: signinData, error } = await supabase.auth.signInWithPassword(data);

    return{
        error: error?.message || "there was an error logging up",
        success: !error,
        data: signinData||null,
    }
}

export async function logout(): Promise<AuthResponse>{
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();
    redirect('/login')

    return{
        error: error?.message || "there was an error logging out",
        success: !error,
        data: null,
    }
}