"use client"
import { Parallax } from 'react-scroll-parallax';
import Image from "next/image"
import { LayoutGrid, BarChartBig, Key, Layers2, FlaskConical } from "lucide-react"

export default function Features() {

    const data = [
        { img: "3", icon: LayoutGrid, title: "Manage Your Clusters", text: "Effortlessly create and manage all your clusters with easy access." },
        { img: "4", icon: Layers2, title: "Set Up Your Templates", text: "Easily configure your templates and output types to unlock the full potential of AI." },
        { img: "5", icon: FlaskConical, title: "Test Locally", text: "No need to deploy APIs to production until you've verified the validity of the template. Test it directly on Type AI." },
        { img: "6", icon: Key, title: "Access Control", text: "Secure your API, manage all your keys, and access it using any preferred programming language." },
        { img: "7", icon: BarChartBig, title: "Logging Provider", text: "Monitor your usage through detailed logs, review all previous accesses, and block suspicious activity instantly." },
    ];

    return (
        <>
            <div className="w-full mx-auto max-w-5xl my-20 p-5 hidden lg:block ">
                {data.map((e) => (
                    <div className="flex items-center justify-center gap-8 lg:flex-row">
                        <Parallax scale={[1, 2]} translateX={[1, 5]} speed={-10}>
                            <Image width={1000} height={100} src={`/landing/${e.img}.png`} className="h-72 w-auto win-w-60 rounded-xl border border-input object-cover" />
                        </Parallax>
                        <Parallax speed={7}>
                            <div className="flex flex-col gap-2 max-w-md dark:bg-transparent bg-foreground backdrop-blur-lg p-5 border border-input rounded-lg ">
                                <div className='flex items-center justify-center gap-2 mb-3 w-max'>
                                    <e.icon size={25} className='text-primary' />
                                    <h1 className="text-xl font-extrabold text-primary ">{e.title}</h1>
                                </div>
                                <p className="text-sm font-light dark:text-foreground/60 max-w-sm text-background">{e.text}</p>
                            </div>
                        </Parallax>
                    </div>
                ))}
            </div>
            <div className="w-full mx-auto max-w-5xl px-5  lg:hidden block ">
                {data.map((e) => (
                    <div className="flex items-center justify-center gap-2 flex-col mb-8">
                        <Image width={1000} height={100} src={`/landing/${e.img}.png`} className="h-72 w-auto win-w-60 rounded-xl border border-input object-cover" />
                        <div className="flex flex-col gap-2 max-w-md backdrop-blur-lg p-5 border border-input rounded-lg ">
                            <div className='flex items-center justify-center gap-2 mb-3 w-max'>
                                <e.icon size={25} className='text-primary' />
                                <h1 className="text-xl font-extrabold text-primary ">{e.title}</h1>
                            </div>
                            <p className="text-sm font-light text-foreground/60 max-w-sm">{e.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
