"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Loader from "react-spinners/MoonLoader"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function page({cluster}) {

    const router = useRouter()

    const [text, setText] = useState("")
    const [pendding, startTransition] = useTransition()

    const handleSave = () => {
        try {
            if (!text) return toast.error("Cluster name should not be empty")
            startTransition(async () => {

                const data = {
                    name: text
                }

                const clusterData = await fetch("/api/cluster", {
                    cache: "no-cache",
                    method: "POST",
                    body: JSON.stringify(data)
                })
                const cluster = await clusterData.json()

                if (cluster.success) {
                    router.push(`/dashboard/${cluster.newCluster.id}`)
                    router.refresh()
                } else {
                    return toast.error("Can't create Cluster : 500")
                }
            })
        } catch (e) {
            toast.error("Can't create Cluster : 500")
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto lg:mt-7 lg:p-5 p-4 ">
            <div className="col-span-full w-full flex items-center justify-start h-16">
                <div className="flex w-max items-center justify-center gap-1">
                    <Link href={"/dashboard"}>
                        <Button className="gap-2 hover:border-transparent w-16" variant="outline">
                            <ArrowLeft size={17} />
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='col-span-full mt-20 flex items-center justify-center flex-col'>
                <h1 className='text-3xl font-bold'>New Cluster</h1>
                <p className='max-w-md text-center text-sm text-foreground/70 mb-2 mt-1'>Experience the simplest way to engage with AI.</p>
                <form className="w-full max-w-md" onSubmit={(e) => { e.preventDefault(), handleSave() }}>
                    <Input value={text} onChange={(e) => setText(e.target.value)} autoFocus={true} className="max-w-md mt-4 bg-transparent backdrop-blur-md h-12" placeholder="What would you like to name your cluster?" />
                </form>
                <div className="w-full max-w-md mt-2 flex items-center justify-end ">
                    {pendding ?
                        <Button disabled className="disabled:opacity-100 bg-primary/60 dark:bg-transparent gap-1 items-center justify-center text-foreground font-medium " size="icon">
                            <Loader color="white" size={15} />
                        </Button>
                        : <Button onClick={handleSave} className="gap-1 items-center justify-center font-medium bg-primary/70 text-background" >
                            Create cluster
                        </Button>}
                </div>
            </div>
        </div>
    )
}