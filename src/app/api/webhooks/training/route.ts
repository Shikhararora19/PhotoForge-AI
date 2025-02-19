import Replicate from "replicate";
import crypto from 'crypto';
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/email-templates/EmailTemplate";
import { NextResponse } from "next/server";


const resend = new Resend(process.env.RESEND_API_KEY);

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN});

export async function POST(req: Request) {
    try{
    const body = await req.json();
    console.log(body);
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId")?? "";
    const modelName = url.searchParams.get("modelName")?? "";  
    const fileName = url.searchParams.get("fileName")?? "";
    // const id = req.headers.get('webhook-id') ?? "";
    // const timestamp = req.headers.get('webhook-timestamp') ?? "";
    // const webhookSignature = req.headers.get('webhook-signature') ?? "";

    // const signedContent = `${id}.${timestamp}.${JSON.stringify(body)}`
    // const secret = await replicate.webhooks.default.secret.get();


    // //verify signature
    // const secretBytes =  Buffer.from(secret.key.split('_')[1], "base64");
    // const signature = crypto
    // .createHmac('sha256', secretBytes)
    // .update(signedContent)
    // .digest('base64');
    // console.log(signature);

    // const expectedSignatures = webhookSignature.split(' ').map(sig => sig.split(',')[1]);
    // console.log(expectedSignatures);
    // const isValid = expectedSignatures.some((expectedSignature) => expectedSignature === signature);
    // console.log(isValid);
            
    // if(!isValid){
    //     return new NextResponse("invalid signature", {status: 401});
    // }

    //get user data
    const {data: userData, error:userError}  = await supabaseAdmin.auth.admin.getUserById(userId);

    if(userError || !userData){
        return new NextResponse("user not found", {status: 404});
    }

    const userEmail = userData.user.email ?? "";
    const userName = userData.user.user_metadata.full_name ?? "";

    if(body.status === "succeeded"){
        await resend.emails.send({
            from: 'PhotoForge AI <onboarding@resend.dev>',
            to: [userEmail],
            subject: 'Model Training Completed',
            react: EmailTemplate({ userName, message: `Your model ${modelName} has been trained successfully!` }),
          });

        await supabaseAdmin.from('models').update({training_status: body.status, 
            training_time: body.metrics.predict_time,
            version: body.output.version.split(":")[1] ?? null,
          }).eq('user_id', userId).eq('user_id', userId).eq('model_name', modelName);

    }else{
        await resend.emails.send({
            from: 'PhotoForge AI <onboarding@resend.dev>',
            to: [userEmail],
            subject: `Model Training ${body.status}`,
            react: EmailTemplate({ userName, message: `Your model ${modelName} has been ${body.status}!` }),
          });

        await supabaseAdmin.from('models').update({training_status: body.status}).eq('user_id', userId).eq('model_name', modelName);

    }
    await supabaseAdmin.storage.from('training_data').remove([`${fileName}`]);

    
    return new NextResponse("Ok", {status: 200});
}catch(error){
    console.error("webhook error", error)
    return new NextResponse("Internal server error", {status: 500});

}
}