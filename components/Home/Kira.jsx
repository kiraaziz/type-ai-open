"use client"
import { Parallax } from 'react-scroll-parallax';

export default function Kira() {
    return (
        <div className='w-full translate-y-36'>
            <Parallax speed={-20} translateX={[-20, 20]} >
                <h1 className='text-8xl font-extrabold '>Type AI</h1>
            </Parallax>
            <Parallax speed={10} translateX={[-20, 20]} >
                <h1 className='text-8xl font-extrabold text-primary py-4 px-10 backdrop-blur rounded-xl border border-primary w-max'>Made By kira</h1>
            </Parallax>
        </div>
    )
}
