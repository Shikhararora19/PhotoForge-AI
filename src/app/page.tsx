import Pricing from "@/components/landing-page/Pricing";
import { getProducts, getUser } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {

  const supabase = await createClient();

  const [user, products] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
  ]);

  // if(user){
  //   return redirect('/dashboard')
  // }
  return (
    <main className="flex flex-col min-h-screnn items-center justify-center">
      <Pricing products={products ?? []}/>
    </main>
  );
}
