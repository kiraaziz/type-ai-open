"use client"
import { Parallax } from 'react-scroll-parallax';

const Video = () => {

    return (
        <>
            <div className="w-full h-[120svh] lg:flex hidden items-center justify-center p-10  flex-col ">
                <Parallax speed={-10} scale={[2, 1]}>
                    <h1 className='mx-auto mb-5 font-bold text-3xl w-max z-20'>Video Guide</h1>
                </Parallax>
                <Parallax speed={10} scale={[1, 2]} easing="easeIn">
                    <div className="h-max w-full mx-auto max-w-3xl border border-primary overflow-hidden rounded-xl shadow-primary shadow-[0_0_20px]" >
                        <iframe className='w-[50svw] h-80'
                            src="https://www.youtube.com/embed/YUUuWDU8-0E?autoplay=1&mute=1">
                        </iframe>
                    </div>
                </Parallax>
            </div>
            <div className="w-full lg:hidden flex items-center justify-center p-5 py-4  flex-col ">
                <h1 className='mx-auto mb-5 font-bold text-3xl w-max z-20'>Video Guide</h1>
                <div className="h-max w-full mx-auto max-w-3xl border border-primary overflow-hidden rounded-xl shadow-primary shadow-[0_0_20px]" >
                    <div className="h-max w-full mx-auto max-w-3xl border border-primary overflow-hidden rounded-xl shadow-primary shadow-[0_0_20px]" >
                        <iframe className='w-[90svw] h-80'
                            src="https://www.youtube.com/embed/YUUuWDU8-0E?autoplay=1&mute=1">
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Video