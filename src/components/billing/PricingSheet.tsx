import { Tables } from '@datatypes.types'
import { User } from '@supabase/supabase-js'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '../ui/button'
import Pricing from './Pricing'
  


type Product = Tables<'products'>
type Prices = Tables<'prices'>
type Subscription = Tables<'subscriptions'>

interface ProductWithPrices extends Product {
    prices: Prices[]
}

interface PriceWithProduct extends Prices {
    products: Product | null
}

interface SubscriptionWithProducts extends Subscription {
    prices: PriceWithProduct | null
}

interface PricingSheetProps {
    subscription: SubscriptionWithProducts,
    user: User | null,
    products: ProductWithPrices[] | null
}

const PricingSheet = ({user, products, subscription}:PricingSheetProps) => {
  return (
    <Sheet>
  <SheetTrigger asChild><Button variant={'outline'}>Upgrade Plan</Button></SheetTrigger>
  <SheetContent className='max-w-full sm:max-w-[90vw] lg:max-w-[70vw] text-left w-full'>
    <SheetHeader>
      <SheetTitle>Change Subscription plan</SheetTitle>
      <SheetDescription>
        Choose a plan that fits your needs and budget to continue using our services.
      </SheetDescription>
    </SheetHeader>

    <Pricing user={user} products={products ?? []} subscription={subscription} mostPopularProduct='pro plan'/>
  </SheetContent>
</Sheet>

  )
}

export default PricingSheet