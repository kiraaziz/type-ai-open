"use client"
import { Parallax } from 'react-scroll-parallax';

export default function Shild() {
    return (
        <Parallax className='absolute -left-1/4' scale={[0.05, 4]} easing="easeInQuad">
            <img src="/icon.svg"  />
        </Parallax>
    )
}
