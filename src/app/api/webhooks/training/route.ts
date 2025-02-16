import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
    const body = await req.json();
    console.log("webhook received", body);
    return NextResponse.json({success:true}, {status: 201});
}catch(error){
    console.error("webhook error", error)
    return new NextResponse("internal server error", {status: 500});

}
}