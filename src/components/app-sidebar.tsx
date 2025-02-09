"use client"

import * as React from "react"
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

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { title } from "process"
import { url } from "inspector"

// This is sample data.
const data =[
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  PhotoForge AI
                </span>
                <span className="truncate text-xs">Pro</span>
              </div>
            </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
