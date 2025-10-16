"use client"
import { useTheme } from "next-themes"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ToggleTheme } from "./ToggleTheme";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBoxIcon, StarsIcon } from "lucide-react";

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
                            <Button className="flex items-center gap-2" variant="outline">
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
          <Link href={"/resume-builder"} className="flex items-center gap-2">  
                <FileText className="h-4 w-4"/>
                <span>Resume Builder</span> 
          </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Link href={"/cover-letter"} className="flex items-center gap-2">  
                <PenBoxIcon className="h-4 w-4"/>
                <span>Cover Letter</span> 
          </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Link href={"/interview-prep"} className="flex items-center gap-2">  
                <GraduationCap className="h-4 w-4"/>
                <span>Interview Prep</span> 
          </Link>

          </DropdownMenuItem>
        </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu> 
    </SignedIn>
    <SignedOut>
        <SignInButton>
            <Button variant="outline">
                Sign In
            </Button>
        </SignInButton>
    </SignedOut>
    <SignedIn>
        <UserButton appearance={{elements:
            {
                avatarBox:"w-10 h-10", 
                userButtonPopoverCard: "shadow-xl", 
                userPreviewMainIdentifier: "font-semibold",
            }
            }} afterSignOutUrl="/" />
    </SignedIn> 
    <ToggleTheme/> 
    
                </div>
            </nav>
        </header>
    )
}