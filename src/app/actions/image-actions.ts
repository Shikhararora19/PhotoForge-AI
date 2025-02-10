'use server'

import { ImageGenerationformSchema } from "@/components/image-generation/configurations";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
    useFileOutput: false,
  });

interface ImageResponse {
    error: null|string,
    success: boolean,
    data: any|null,
}

export async function generateImageAction(input: (z.infer<typeof ImageGenerationformSchema>)):Promise<ImageResponse>{
    const modelInput = {
        prompt: input.prompt,
        go_fast: true,
        guidance: input.guidence,
        megapixels: "1",
        num_outputs: input.num_outputs,
        aspect_ratio: input.aspect_ratio,
        output_format: input.output_format,
        output_quality: input.output_quality,
        prompt_strength: 0.8,
        num_inference_steps: input.num_inference_steps,
      };
      
      try{
        const output = await replicate.run(input.model as `${string}/${string}`, { input: modelInput });
        console.log(output)
        return{
            error: null,
            success: true,
            data: output,
        }

      }
        catch(error: any){
            return{
                error: error.message || "there was an error generating the image",
                success: false,
                data: null,
            }
        }

}