import Header from "@/components/Home/Header"
import ParallaxProvider from "@/components/providers/ParallaxProvider"
import Video from "@/components/Home/VideoGuid"
import Feature from "@/components/Home/Features"
import Link from "next/link"
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function page() {
    return (
        <div className="h-max relative">
            <div className='h-44 w-96 bg-primary fixed -top-20 -right-20 rounded-full blur-3xl opacity-10 -z-20' />
            <div className='h-60 w-60 bg-primary fixed -bottom-20 -left-20 rounded-full blur-3xl opacity-30  scale-150' />
            <div className='h-64 w-32 bg-blue-500 rotate-45 fixed top-44 -z-20 right-20 rounded-full blur-3xl opacity-30  scale-150' />
            <div className='h-32 w-32 bg-pink-500 fixed bottom-20 left-20 rounded-full blur-3xl opacity-30  scale-150' />
            <div className='w-full p-8 border-b border-input sticky  top-0 backdrop-blur-2xl z-50'>
                <div className="flex items-center justify-between max-w-7xl w-full mx-auto">
                    <Link href={"/"} className='text-xl font-bold flex items-center justify-center gap-2 w-max'>
                        <Image height={40} width={40} className='' alt='app logo' src="/icon.svg" />
                        Type AI
                    </Link>
                    <Link href={"/dashboard/"}>
                        <Button className="rounded-md px-5 text-base font-semibold h-10  gap-2">
                            Dashborad
                        </Button>
                    </Link>
                </div>
            </div>
            <ParallaxProvider>
                <div className='w-full overflow-x-hidden h-max'>
                    <div className="w-full">
                        <Header />
                        <div className="w-full max-w-3xl mx-auto border-b border-primary/50 flex items-center justify-center ">
                            <div className="w-1/4 bg-gradient-to-l blur translate-y-1 from-primary h-2 "></div>
                            <div className="w-1/4 bg-gradient-to-r blur translate-y-1 from-primary h-2 "></div>
                        </div>
                        <Video />
                        <div className="w-full max-w-3xl mx-auto border-b border-primary/50 flex items-center justify-center  mt-10 mb-10 lg:mb-48">
                            <div className="w-1/4 bg-gradient-to-l blur translate-y-1 from-primary h-2 "></div>
                            <div className="w-1/4 bg-gradient-to-r blur translate-y-1 from-primary h-2 "></div>
                        </div>
                        <Feature />
                    </div>
                </div>
            </ParallaxProvider>
            <div className="w-full border-t border-input backdrop-blur-lg z-50 p-10">
                <div class="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <div class="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div class="sm:col-span-2">
                            <a href="/" aria-label="Go home" title="Company" class="inline-flex items-center">
                                <img src="/icon.svg" className="w-16" />
                                <span class="ml-2 text-xl font-bold tracking-wide uppercase">Light AI</span>
                            </a>
                        </div>
                        <div class="space-y-2 text-sm">
                            <p class="text-base font-bold tracking-wide ">Contacts</p>
                            <div class="flex">
                                <p class="mr-1 ">Email:</p>
                                <a href="mailto:info@lorem.mail" aria-label="Our email" title="Our email" class="transition-colors duration-300 text-deep-purple-accent-400 text-foreground/70 hover:text-deep-purple-800">kiraaziz2020@gmail.com</a>
                            </div>
                            <div className="flex items-center justify-center gap-2 w-max opacity-70">
                                <Link href={"https://github.com/kiraaziz"}> Github </Link> |
                                <Link href={"https://www.facebook.com/aziz.kira.581/"}> Facebook </Link>|
                                <Link href={"https://dev.to/kiraaziz"}> Dev.to </Link>
                            </div>
                        </div>
                        <div>
                            <span class="text-base font-bold tracking-wide ">Links</span>
                            <div className="flex items-center justify-center gap-2 w-max opacity-70">
                                <Link href={"/dashboard"}> Dashboard </Link> |
                                <Link href={"/docs"}> Docs </Link> |
                                <Link href={"https://kiraaziz.vercel.app"}> Kira Site </Link>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col-reverse justify-between border-input pt-5 pb-10 border-t lg:flex-row">
                        <p class="text-sm ">
                            © Copyright 2020 Kira Inc. All rights reserved.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
