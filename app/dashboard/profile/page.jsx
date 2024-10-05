import { User } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import Profile from "./../../../components/Profile"

export async function metadata() {
    return {
        title: "Type AI - Profile",
    };
}

export default async function page() {

    return (
        <div className="p-10 mx-auto  lg:mt-10 pb-5">
            <div className='flex gap-4'>
                <User size={28} className='text-primary/70 ' />
                <div className='flex flex-col'>
                    <h1 className='flex items-center justify-center w-max gap-4 text-2xl font-semibold'>
                        Your Profile
                    </h1>
                </div>
            </div>
            <Suspense fallback={<LoaderUi />}>
                <Loader />
            </Suspense>
        </div>
    )
}

const Loader = async () => {

    const session = await getServerSession()

    return (
        <Profile user={session} />
    )
}

const LoaderUi = () => {

    return (
        <div className='mx-auto max-w-5xl lg:flex-row flex-col flex lg:items-end lg:justify-end  mt-5'>
            <div className='p-5 flex-1'>
                <div className='w-60 h-60 bg-primary/20 animate-pulse rounded-full' />
            </div>
            <div className='flex items-start justify-end flex-col gap-2 flex-1 self-end w-full'>
                <div className='flex h-10 animate-pulse w-full bg-primary/20 border border-input rounded' />
                <div className='flex h-10 animate-pulse bg-primary/20 border border-input rounded w-full' />
                <div className='flex h-10 animate-pulse w-2/5 bg-primary/20 border border-input rounded' />

                <div className='w-full mt-8 flex items-center justify-end gap-2 '>
                    <div className='h-10 bg-primary/20 rounded-full w-28 animate-pulse' />
                    <div className='h-10 bg-destructive rounded-full w-28 animate-pulse' />
                </div>
            </div>
        </div>
    )
}