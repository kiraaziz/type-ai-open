import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import { getAllSmallCluster } from '../api/seo/get';
import Loader from "@/components/loader"
import { Suspense } from "react"

export default function page({ children }) {

    return (
        <Suspense fallback={<div className='flex h-full w-full flex-col'>
            <Navbar clusters={[]} />
            <div className='relative w-full  h-full overflow-hidden'>
                <div className='absolute bottom-0 w-full shadow-background shadow-[0_0_80px_30px] h-0 -z-10' />
                <div className='absolute top-0 w-full shadow-background shadow-[0_0_80px_30px] h-0  -z-20' />
                <div className='h-44 w-96 bg-primary absolute -top-20 -right-20 rounded-full blur-3xl opacity-10 -z-20' />
                <div className='h-60 w-60 bg-primary absolute -bottom-20 -left-20 rounded-full blur-3xl opacity-30  scale-150' />
                <div className='w-full flex h-full  top-0 right-0 absolute overflow-auto'>
                    <Loader />
                </div>
            </div>
        </div>}>
            <DataProvider children={children} />
        </Suspense>
    )
}

const DataProvider = async ({ children }) => {

    const session = await getServerSession()
    if (!session) {
        return redirect("/api/auth/signin")
    }

    const { clusters } = await getAllSmallCluster()

    return (
        <div className='flex h-full w-full flex-col'>
            <Navbar user={session.user} clusters={clusters} />
            <div className='relative w-full  h-full overflow-hidden'>
                <div className='absolute bottom-0 w-full shadow-background shadow-[0_0_80px_30px] h-0 -z-10' />
                <div className='absolute top-0 w-full shadow-background shadow-[0_0_80px_30px] h-0  -z-20' />
                <div className='h-44 w-96 bg-primary absolute -top-20 -right-20 rounded-full blur-3xl opacity-10 -z-20' />
                <div className='h-60 w-60 bg-primary absolute -bottom-20 -left-20 rounded-full blur-3xl opacity-30  scale-150' />
                <div className='h-64 w-32 bg-blue-500 rotate-45 absolute top-44 -z-20 right-20 rounded-full blur-3xl opacity-30  scale-150' />
                <div className='h-32 w-32 bg-pink-500 absolute bottom-20 left-20 rounded-full blur-3xl opacity-30  scale-150' />
                <div className='w-full flex h-full  top-0 right-0 absolute overflow-auto'>
                    {children}
                </div>
            </div>
        </div>
    )
}
