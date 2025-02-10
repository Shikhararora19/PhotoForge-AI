import { error } from 'console'
import { create } from 'zustand'
import { ImageGenerationformSchema } from '@/components/image-generation/configurations'
import { z } from 'zod'
import { generateImageAction } from '@/app/actions/image-actions'
import { url } from 'inspector/promises'


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

        try{
            const {error,success,data} = await generateImageAction(values)
            if (!success){
                set({error:error, loading: false})
                return
            }

            const dataWithUrl = data.map((url:string) => {
                return {url}
            }
            )
            set({images: dataWithUrl, loading: false})
        }
        catch(error){
            console.error(error)
            set({error: 'There was an error generating the image', loading: false})
        }



    }
})) 

export default useGeneratedStore