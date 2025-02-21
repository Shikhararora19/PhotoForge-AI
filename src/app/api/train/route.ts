import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN})

const WEBHOOK_URL = process.env.SITE_URL ?? "https://382f-2604-3d09-6479-2a10-3888-cd6d-1b7f-695c.ngrok-free.app"

async function validateUserCredits(userId: string){
    const supabase = await createClient();
    const {data: creditsData, error} = await supabaseAdmin.from('credits').select('*').eq('user_id', userId).single();

    if(error){
        throw new Error(error.message || "There was an error fetching credits")
    }

    if(!creditsData){
        throw new Error("No credits found for user")
    }

    const credits = creditsData?.model_training_count ?? 0

    if(credits <= 0){
        throw new Error("Insufficient credits")
    }

    return credits
}

export async function POST(request: NextRequest){
    try{
        if(!process.env.REPLICATE_API_TOKEN){
            throw new Error("The replicate api token is not set")
        }

        const supabase = await createClient();
        const{data: {user}} = await supabase.auth.getUser()
        if(!user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})  
        }

        const formData = await request.formData()
        const input={
            fileKey: formData.get('fileKey') as string,
            modelName: formData.get('modelName') as string,
            gender: formData.get("gender") as string,
        }
        if(!input.fileKey || !input.modelName){
            return NextResponse.json({error: "Missing required fields"}, {status: 400})  
        }

        const oldCredits = await validateUserCredits(user?.id)

        const fileName = input.fileKey.replace("training_data/", "");
        const {data: fileUrl} = await supabaseAdmin.storage.from('training_data').createSignedUrl(fileName, 3600)

        if(!fileUrl?.signedUrl){
            throw new Error("Failed to get signed url")
        }

        // const hardware = await replicate.hardware.list()

        // console.log("hardware", hardware)

        const modelId = `${user.id}_${Date.now()}_${input.modelName.toLowerCase().replaceAll(" ", "_")}`

        await replicate.models.create("shikhararora19", modelId, {
            visibility: "private",
            hardware: "gpu-a100-large",
        })

        const training = await replicate.trainings.create(
            "ostris",
            "flux-dev-lora-trainer",
            "b6af14222e6bd9be257cbc1ea4afda3cd0503e1133083b9d1de0364d8568e6ef",
            {
              // You need to create a model on Replicate that will be the destination for the trained version.
              destination: `shikhararora19/${modelId}`,
              input: {
                steps: 650,
                resolution: "1024",
                input_images: fileUrl.signedUrl,
                trigger_word: "ohwx",
                },
                webhook: `${WEBHOOK_URL}/api/webhooks/training?userId=${user.id}&modelName=${encodeURIComponent(input.modelName)}&fileName=${encodeURIComponent(fileName)}`,
                webhook_events_filter: ["completed"]
            }
          );

        await supabaseAdmin.from("models").insert({
            model_id: modelId,
            user_id: user.id,
            model_name: input.modelName,
            gender: input.gender,
            training_status: training.status,
            trigger_word: "ohwx",
            training_steps: 650,
            training_id: training.id,
        });

        await supabaseAdmin.from("credits").update({
            model_training_count: oldCredits - 1
        }).eq("user_id", user?.id)


        //console.log("training", training)


        return NextResponse.json({success: true}, {status: 201})  
    
    }catch(error){
        console.error("training error", error)

        const errorMessage = error instanceof Error ? error.message : "Failed to start model training"

        return NextResponse.json({error: errorMessage}, {status: 500})  
    }
}