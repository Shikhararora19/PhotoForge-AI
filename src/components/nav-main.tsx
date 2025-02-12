"use client"

import {type LucideIcon } from "lucide-react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronsUpDown,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  Image,
  Layers,
  Map,
  PieChart,
  Settings2,
  Settings2Icon,
  Sparkles,
  SquareTerminal,
} from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems =[
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal
  },
  {
    title: "Generate Image",
    url: "/image-generation",
    icon: Image
  },
  {
    title: "My Models",
    url: "/models",
    icon: Frame
  },
  {
    title: "Train Model",
    url: "/model-training",
    icon: Layers
  },
  {
    title:"My Images",
    url: "/gallery",
    icon: GalleryVerticalEnd
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard
  },
  {
    title: "Settings",
    url: "/account-settings",
    icon: Settings2Icon
  },



]


export function NavMain() {

  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map((item) => (
           <Link key={item.title} href={item.url} className={cn('rounded-none',
            item.url === pathname ? 'text-primary bg-primary-5' : 'text-muted-foreground'
           )}>
              
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
      ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
