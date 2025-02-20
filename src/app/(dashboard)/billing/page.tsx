import PlanSummary from '@/components/billing/PlanSummary';
import { getProducts, getSubscription, getUser } from '@/lib/supabase/queries';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

const BillingPage = async () => {

  const supabase = await createClient();


  const [user, products, subscription] = await Promise.all([
      getUser(supabase),
      getProducts(supabase),
      getSubscription(supabase),
    ]);

    if(!user){
      return redirect('/login')
    }
  return (
    <section className='container mx-auto space-y-8'><div>
      <h1 className='text-3xl font-bold tracking-tight'>Plans and Billing</h1>
      <p className='text-muted-foreground'>Manage your billing and subscription here.</p>
    </div>
    <div className='grid gap-10'>
      <PlanSummary subscription={subscription} user={user} products={products || []}/>
    </div>
    </section>
  )
}

export default BillingPage