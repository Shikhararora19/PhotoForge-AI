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

    const { data: profileData, error } = await supabase.auth.signInWithPassword(data);

    return{
        error: error?.message || "there was an error logging up",
        success: !error,
        data: profileData||null,
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

export async function updateProfile(values: {fullName:string}): Promise<AuthResponse>{
    const supabase = await createClient();
    const full_name = values.fullName;


    const { data: profileData, error } = await supabase.auth.updateUser({
        data: {
            full_name: values.fullName,
        }
    });

    return{
        error: error?.message || "there was an error updating profile",
        success: !error,
        data: profileData||null,
    }
}

export async function resetPassword(values: {email:string}): Promise<AuthResponse>{
    const supabase = await createClient();


    const { data: resetPasswordData, error } = await supabase.auth.resetPasswordForEmail(values.email);

    return{
        error: error?.message || "there was an error sending reset password email",
        success: !error,
        data: resetPasswordData||null,
    }
}