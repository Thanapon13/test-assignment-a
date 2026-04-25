"use client";

import {
  IconDashboard,
  IconInnerShadowTop,
  IconHome,
} from "@tabler/icons-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { LoginForm } from "@/components/auth/login-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Home",
      url: "http://localhost:3000/",
      icon: IconHome,
    },
    {
      title: "Dashboard",
      url: "http://localhost:3000/admin",
      icon: IconDashboard,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { toggleSidebar, state } = useSidebar();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-between items-center">
            {state === "expanded" ? (
              <>
                <Link variant="ghost" size="icon" href="http://localhost:3000">
                  <IconInnerShadowTop className="size-5" />
                </Link>
                <SidebarTrigger className="cursor-pointer" />
              </>
            ) : (
              <Link
                size="icon"
                onClick={toggleSidebar}
                className="cursor-pointer w-full"
                href="http://localhost:3000"
              >
                <IconInnerShadowTop className="size-5" />
              </Link>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          items={data.navMain}
          onIconClick={toggleSidebar}
          state={state}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onSignIn={() => setIsLoginOpen(true)} />
      </SidebarFooter>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <LoginForm />
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}
