"use client"
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ChevronDown, LogOut, User, Receipt } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from 'next-auth/react'

export default function Navbar({ clusters, user }) {

    const router = useRouter()
    const pathname = usePathname().replace("/dashboard", "")
    const staticPath = ["", "/new", "/plans", "/profile"]
    const staticName = ["Overview", "New", "Plans", "Profile"]

    const staicClusterPath = ["", "/test", "/logs", "/api", "/settings"]
    const staicClusterPathName = ["Overview", "Test", "Logs", "Api", "Settings"]

    return (
        <div className='px-8 lg:px-14 py-6  border-input border-b bg-background flex items-center justify-between'>
            <div className='flex items-center justify-center w-max'>
                <Link href={"/dashboard"} className='text-xl font-bold flex items-center justify-center gap-2 w-max'>
                    <Image height={40} width={40} className='' alt='app logo' src="/icon.svg" />
                    Type AI
                </Link>
                <Breadcrumb className="ml-10 lg:flex hidden">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link className='text-base font-bold' href="/dashboard">
                                    Dashboard
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {staticPath.includes(pathname) ?
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link className='text-base font-bold bg-primary/20 px-4 py-0.5 rounded-full text-primary' href="/dashboard">
                                        {staticName[staticPath.findIndex((x) => x === pathname)]}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            : clusters && clusters[clusters.findIndex((x) => x.id === pathname.split("/")[1])] && <><BreadcrumbItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='text-base font-bold flex gap-2 items-center justify-center bg-primary/5 px-4 py-1 border border-input rounded-lg' >
                                        {clusters[clusters.findIndex((x) => x.id === pathname.split("/")[1])].name}
                                        <ChevronDown size={18} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="border-input bg-transparent backdrop-blur-md">
                                        {clusters.map((clu) => (
                                            <DropdownMenuItem onClick={() => router.push(`/dashboard/${clu.id}/` + (pathname.split("/").length !== 2 ? pathname.split("/")[pathname.split("/").length - 1] : ""))}>
                                                {clu.name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink className='text-base font-bold bg-primary/20 px-4 py-0.5 rounded-full text-primary' >
                                        {staicClusterPathName[staicClusterPath.findIndex((x) => "/" + pathname.split("/")[1] + x === pathname)]}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </>}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="border border-input shadow-sm">
                        <AvatarImage className="object-cover " src={user?.image} />
                        <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-input bg-transparent backdrop-blur-md">
                    <DropdownMenuLabel>
                        <h1 className=''>{user?.name}</h1>
                        <p className='text-sm font-light text-foreground/60'>{user?.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard/profile")} className="gap-2">
                        <User size={17} /> Profile
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => router.push("/dashboard/plans")} className="gap-2">
                        <Receipt size={17} /> Billing
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="gap-2">
                        <LogOut size={17} /> Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
