import { error } from 'console'
import { create } from 'zustand'
import { ImageGenerationformSchema } from '@/components/image-generation/configurations'
import { z } from 'zod'
import { generateImageAction, storeImages } from '@/app/actions/image-actions'
import { url } from 'inspector/promises'
import { toast } from 'sonner'


interface GenerateState{
    loading: boolean,
    images: Array<{url: string}>,
    error: null|string,
    generateImage: (values: z.infer<typeof ImageGenerationformSchema>) => Promise<void>
}


const useGeneratedStore = create<GenerateState>((set) => ({
    loading: false,
    images: [],
    error: null,

    generateImage: async (values: z.infer<typeof ImageGenerationformSchema>) => {
        set({loading: true, error: null})

        const toastId = toast.loading("Generating Image...")

        try{
            const {error,success,data} = await generateImageAction(values)
            if (!success){
                set({error:error, loading: false})
                return
            }

            const dataWithUrl = data.map((url:string) => {
                return {url,
                        ...values
                }
            }
            )
            set({images: dataWithUrl, loading: false})
            toast.success("Image generated successfully", {id: toastId})

            await storeImages(dataWithUrl)
            toast.success("Image stored successfully", {id: toastId})
        }
        catch(error){
            console.error(error)
            set({error: 'There was an error generating the image', loading: false})
        }


    }
})) 

export default useGeneratedStore