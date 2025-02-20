import { Tables } from '@datatypes.types'
import { User } from '@supabase/supabase-js'
import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import PricingSheet from './PricingSheet'

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

interface PlanSummaryProps {
    subscription: SubscriptionWithProducts,
    user: User | null,
    products: ProductWithPrices[] | null
}

const PlanSummary = ({
    subscription,
    user,
    products,

}:PlanSummaryProps) => {

    if(!subscription || subscription.status !== 'active'){
        return <Card className='max-w-5xl '>
            <CardContent className='px-5 py-4'>
                <h3 className='pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2'>
                    <span>Plan Summary</span>
                    <Badge variant={'secondary'} className='bg-primary/10'>No Plan</Badge>
                </h3>
                <div className='grid grid-cols-8 gap-4'>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between'>
                        <span className='font-normal text-muted-foreground ml-1 lowercase'>
                            Image Generation Credits Left
                        </span>
                        <span className=''>
                            0 remaining
                        </span>
                        </div>
                        <div className='mb-1 flex items-end'>
                        <Progress value={0} className='w-full h-2'/>
                    
                    </div>
                    </div>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between'>
                        <span className='font-normal text-muted-foreground ml-1 lowercase'>
                            Model Training Credits Left
                        </span>
                        <span className=''>
                            0 remaining
                        </span>
                        </div>
                        <div className='mb-1 flex items-end'>
                        <Progress value={0} className='w-full h-2'/>
                    </div>
                    </div>
                    <div className='col-span-full flex flex-col pr-12'>
                        Please upgrade your plan to continue using the service.
                    </div>
                </div>
            </CardContent>
            <CardFooter className='border-t border-border px-4 py-3'>
                <span className='flex ml-auto flex-row'>
                    <PricingSheet user={user} products={products ?? []} subscription={subscription}/>
                </span>
            </CardFooter>
        </Card>
    }

    console.log(subscription)

    const {products: subscriptionProduct, unit_amount, currency} = subscription?.prices!;
    const priceString = new Intl.NumberFormat('en-US', {style: 'currency', currency: currency || 'CAD', minimumFractionDigits:0}).format((unit_amount || 0) / 100)


  return (
    <Card className='max-w-5xl '>
            <CardContent className='px-5 py-4'>
                <h3 className='pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2'>
                    <span>Plan Summary</span>
                    <Badge variant={'secondary'} className='bg-primary/10'>{subscriptionProduct?.name}</Badge>
                </h3>
                <div className='grid grid-cols-8 gap-4'>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between'>
                        <span className='font-normal text-muted-foreground ml-1 lowercase'>
                            Image Generation Credits Left
                        </span>
                        <span className=''>
                            0 remaining
                        </span>
                        </div>
                        <div className='mb-1 flex items-end'>
                        <Progress value={0} className='w-full h-2'/>
                    
                    </div>
                    </div>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between'>
                        <span className='font-normal text-muted-foreground ml-1 lowercase'>
                            Model Training Credits Left
                        </span>
                        <span className=''>
                            0 remaining
                        </span>
                        </div>
                        <div className='mb-1 flex items-end'>
                        <Progress value={0} className='w-full h-2'/>
                    </div>
                    </div>
                    <div className='col-span-3 flex flex-row justify-between flex-wrap'>
                        <div className="flex flex-col pb-0">
                            <div className='text-sm font-normal'>
                                price/month
                            </div>
                            <div className='flex-1 pt-1 text-sm font-medium'>
                                {priceString}
                            </div>

                        </div>
                        <div className="flex flex-col pb-0">
                            <div className='text-sm font-normal'>
                                Included Credits
                            </div>
                            <div className='flex-1 pt-1 text-sm font-medium'>
                                0 credits
                            </div>

                        </div>
                        <div className="flex flex-col pb-0">
                            <div className='text-sm font-normal'>
                                Renewal Date
                            </div>
                            <div className='flex-1 pt-1 text-sm font-medium'>
                                {new Date(subscription.current_period_end).toLocaleDateString()}
                            </div>

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
  )
}

export default PlanSummary