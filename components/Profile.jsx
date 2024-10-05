"use client"

import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/Mode"
import { Button } from "@/components/ui/button"
import { LogOut, RefreshCcw } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { GooSpinner } from "react-spinners-kit"

const Profile = ({ user }) => {

    const [name, setName] = useState(user.user.name)
    const [selectedImage, setSelectedImage] = useState(user.user.image)


    const router = useRouter()

    const [panding, startTransition] = useTransition()

    return (
        <div className=' lg:flex-row flex-col flex lg:items-end lg:justify-end my-auto mt-5'>
            <div className='p-5 flex-1'>
                <Avatar className="h-60 w-60 object-cover rounded-full border border-input">
                    <AvatarImage className="object-cover" src={selectedImage} />
                    <AvatarFallback className="text-3xl font-bold tracking-widest">{name.substring(0, 2)}</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex items-start justify-end flex-col gap-2 flex-1 self-end w-full'>
                <Input disabled={true}  value={name} onChange={(e) => setName(e.target.value)} placeholder="User name" />
                <Input value={user.user.email} disabled={true} />
                <ModeToggle />
                <div className='w-full mt-8 flex items-center justify-end gap-2 '>
                    {
                        (name === user.user.name && selectedImage === user.user.image) ? null :
                            !panding ? <Button onClick={handleSave} variant="outline" className="gap-3 px-6 rounded-full hover:bg-primary/80 bg-primary/50 font-medium">
                                Update
                                <RefreshCcw size={16} />
                            </Button>
                                : <Button disabled variant="outline" className="rounded-full bg-primary/50 overflow-hidden">
                                    <GooSpinner size={30} color="white" />
                                </Button>}
                    <Button onClick={() => signOut()} className="hover:bg-destructive bg-destructive opacity-80 ease-in-out duration-200 hover:opacity-100 gap-3 px-7 rounded-full text-destructive-foreground">
                        Logout
                        <LogOut className="" size={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Profile