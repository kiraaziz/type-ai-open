"use client"

import { useTheme } from "next-themes"
import { LogOut, Moon, Settings, Sun, SunMoon } from "lucide-react"
import { Button } from "./ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="gap-2" variant="outline">
                    <Sun className="h-[1.2rem] w-[1.2rem] block dark:hidden" />
                    <Moon className="h-[1.2rem] w-[1.2rem]  hidden dark:block" />
                    <span >Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-input" >
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2" size={19} />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2" size={19} />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <SunMoon className="mr-2" size={19} />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}