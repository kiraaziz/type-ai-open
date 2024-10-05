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
            <div className="w-full mx-auto max-w-4xl lg:p-14 p-5 space-y-5">
                <div className="w-full">
                    <h1 className="text-xl font-bold">For now there is only this video as tutorial</h1>
                </div>
                <div className="w-full flex items-center justify-center flex-col ">
                    <div className="h-max w-full mx-auto max-w-3xl border border-primary overflow-hidden rounded-xl shadow-primary shadow-[0_0_20px] flex items-center justify-center" >
                        <iframe className='w-[50svw] h-80'
                            src="https://www.youtube.com/embed/YUUuWDU8-0E?autoplay=1&mute=1">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
