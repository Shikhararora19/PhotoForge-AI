'use client'
import React, { useState } from 'react'
import { AnimatedGradientText } from '../magicui/animated-gradient-text'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { Switch } from '../ui/switch'
import { Tables } from '@datatypes.types'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Button } from '../ui/button'
import { features } from 'process'
import { Check } from 'lucide-react'
import PricingSheet from './PricingSheet'
import { User } from '@supabase/supabase-js'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { checkoutWithStripe, createStripePortal } from '@/lib/stripe/server'
import { getErrorRedirect } from '@/lib/helpers'
import { getStripe } from '@/lib/stripe/client'
import { toast } from 'sonner'

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

interface PricingProps {
    subscription: SubscriptionWithProducts,
    mostPopularProduct?: string,
    products: ProductWithPrices[],
    user: User | null,
    showInterval?: boolean,
    className?: string,
    activeProduct?: string
}

const renderPricingButton = ({
    subscription, user, product, price, mostPopularProduct, handleStripeCheckout, handleStripePortalRequest
}:{
    subscription: SubscriptionWithProducts | null; user: User | null; product: ProductWithPrices; price: Prices, mostPopularProduct: string, handleStripeCheckout: (price: Prices) => Promise<void>, handleStripePortalRequest: () => Promise<void>
}) => {
    //case1 user has an active subscription
    if(user && subscription && subscription.prices?.products?.name?.toLowerCase() === product.name?.toLowerCase()){
        return(
        <Button className='mt-8 w-full font-semibold' onClick={handleStripePortalRequest}>
            Manage Subscription
        </Button>
        )
    
    }

    //case2 user is logged in and has an active subscription for a different product
    if(user && subscription && subscription.prices?.products?.name?.toLowerCase() !== product.name?.toLowerCase()){
        return(
        <Button className='mt-8 w-full font-semibold' variant={'secondary'} onClick={handleStripePortalRequest}>
            Switch Plan
        </Button>
        )
    }

    //case3 user is logged in and has no active subscription
    if(user && !subscription){
        return (<Button className='mt-8 w-full font-semibold' variant={product.name?.toLowerCase() === mostPopularProduct.toLowerCase() ? 'default' : 'secondary'} onClick={() => handleStripeCheckout(price)}>
            Subscribe
        </Button>
        )
    }

    return <Button className='mt-8 w-full font-semibold' variant={product.name?.toLowerCase() === mostPopularProduct.toLowerCase() ? 'default' : 'secondary'} onClick={() => handleStripeCheckout(price)}>
    Subscribe
</Button>;
}

const Pricing = ({
    user,
    products,
    mostPopularProduct = 'pro plan',
    subscription,
    showInterval = true,
    className,
    activeProduct = ""
}: PricingProps) => {

    const [billingInterval, setBillingInterval] = useState('month')
    console.log(products)

    const router = useRouter();
    const currentPath = usePathname()



    const handleStripeCheckout = async (price : Prices) => {
        //console.log('price', price)

        if(!user){
            return router.push('/login')
        }

        const {errorRedirect, sessionId} = await checkoutWithStripe(price, currentPath)

        if(errorRedirect){
            return router.push(errorRedirect)
        }

        if (!sessionId){
            return router.push(getErrorRedirect(
                currentPath, "There was an error creating the checkout session", "Please try again later"
            ))
        }

        const stripe = await getStripe();
        stripe?.redirectToCheckout({sessionId})
    }
    const handleStripePortalRequest = async () => {
        toast.info('Redirecting to stripe manage subscription')
        const redirectUrl = await createStripePortal(currentPath)
        return router.push(redirectUrl)
    }
  return (  
    <section className={cn('max-w-7xl mx-auto py-16 px-4 sm:px-5 lg:px-9 w-full flex flex-col', className)}>
        {showInterval 
        &&
        <div className='flex justify-center items-center space-x-4 py-8'>
            <Label htmlFor='pricing-switch' className='font-semibold text-base'>
                Monthly
            </Label>
            <Switch id='pricing-switch' 
            checked={billingInterval === 'year'}
            onCheckedChange={(checked) => setBillingInterval(checked? 'year':'month')}/>
            <Label htmlFor='pricing-switch' className='font-semibold text-base'>
                Yearly
            </Label>
        </div>
        }
        

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 place-items-center mx-auto gap-8 space-y-0'>
            {
                products.map(product => {
                    const price = product?.prices?.find(price => price.interval === billingInterval)
                    if(!price) return null;
                    const priceString = new Intl.NumberFormat('en-US', {style: 'currency', currency: price.currency!, minimumFractionDigits:0}).format((price?.unit_amount || 0) / 100)
                    return <div key={product.id} className={cn('border bg-background rounded-xl shadow-sm h-fit divide-border border-border divide-y',
                    product.name?.toLowerCase() === activeProduct.toLowerCase() ? 'border-primary bg-background drop-shadow-md scale-105' : 'border-border'
                )}>
                        <div className='p-6'>
                            <h2 className='text-2xl font-semibold leading-6 text-foreground flex items-center justify-between'>
                                {product.name}
                                {
                                    product.name?.toLowerCase() === activeProduct.toLowerCase() ? <Badge className='border-border font-semibold'> 
                                        Selected
                                    </Badge> : null
                                }
                            </h2>
                            <p className='text-muted-foreground mt-4 text-sm'>
                                {product.description}
                            </p>
                            <p className='mt-8'>
                                <span className='text-4xl font-extrabold'>{priceString}</span>
                                <span className='text-base font-medium text-muted-foreground'>/{billingInterval === 'year' ? 'year' : 'month'}</span>
                            </p>
                        </div>
                            {
                                renderPricingButton({
                                    subscription,
                                    user,
                                    product,
                                    price,
                                    mostPopularProduct,
                                    handleStripeCheckout,
                                    handleStripePortalRequest
                                })
                            }

                    </div>    
                    })
            }
        </div>
    </section>
  )
}

export default Pricing