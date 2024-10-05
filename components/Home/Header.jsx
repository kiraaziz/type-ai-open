import Link from "next/link"
import { Button } from '../ui/button'
import { Sparkle, BookText } from "lucide-react"
import Shild from "./Shild"
import Image from "next/image"

export default function Header() {
    return (
        <div className='w-full h-[88svh]  relative overflow-hidden'>
            <div className='w-full h-full absolute top-0 right-0  opacity-20 overflow-hidden -z-20'>
                <div className='relative h-full w-full flex items-center justify-center '>
                    <Image width={1000} height={100} src='/landing/1.png' className='h-full w-full object-cover object-top opa' />
                    <Shild />
                    <div className='w-full absolute bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent' />
                    <div className='w-full absolute top-0 h-1/2 bg-gradient-to-b  from-background to-transparent' />
                </div>
            </div>
            <div className='flex items-center justify-center h-full w-full flex-col p-5'>
                <div className='max-w-3xl text-center'>
                    <h1 className='dark:text-white text-foreground text-3xl font-bold'>
                        Create Your Own AI API
                    </h1>
                    <p className='text-foreground/70 mt-1 mb-3 max-w-2xl text-lg'>
                        Easily design custom AI templates with TypeAI, then deploy them as REST APIs for seamless integration. Experience the future of AI customization.
                    </p>
                </div>
                <div className='w-full flex items-center justify-center gap-4 mt-3 flex-col lg:flex-row'>
                    <Link href={"/dashboard/"}>
                        <Button className="rounded-full px-9 text-base font-semibold h-12 shadow-primary shadow-[0_0_20px] gap-2">
                            <Sparkle size={20} />
                            Start Free
                        </Button>
                    </Link>
                    <Link href={"/docs/"}>
                        <Button variant="outline" className="rounded-full px-9 text-base font-semibold h-12 shadow-primary shadow-[0_0_14px] gap-2 border-primary">
                            <BookText size={20} />
                            Documentation
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
