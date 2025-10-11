"use client"
import { useTheme } from "next-themes"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ToggleTheme } from "./ToggleTheme";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, LayoutDashboard, StarsIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export default function Header(){
    const { theme, setTheme } = useTheme()
    const logoSrc = theme === 'light' ? '/logo_light.png' : '/logo.png';

    return(
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
            <nav className="container px-4 h-16 w-full flex items-center">
                <Link href="/">
                    <Image src={logoSrc} alt="CareerMind.AI" width={180} height={40} 
                        className="h-auto w-auto object-contain py-2 pr-4"/> 
                </Link>
            

                <div className="flex items-center space-x-2 md:space-x-4 ml-auto"> 
                    <SignedIn>
                        <Link href={'/dashboard'}>
                            <Button className="flex items-center gap-2">
                                <LayoutDashboard className="h-4 w-4"/> 
                                <span className="hidden md:block">Industry Insights</span>
                            </Button>
                        </Link>
                        <DropdownMenu>
      <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2">
                <StarsIcon className="h-4 w-4"/> 
                <span className="hidden md:block">Prep Tools</span>
                <ChevronDown className="h-4 w-4" />
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
                    </SignedIn>
                    <div className="flex items-center gap-4"> 
                        <SignedIn>
                            <UserButton />
                        </SignedIn> 
                        <ToggleTheme/> 
                    </div>
                
    
                </div>
            </nav>
        </header>
    )
}