"use client"

import { useState, useTransition } from "react"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import Loader from "react-spinners/MoonLoader"
import { Button } from "./ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

function timeAgo(dateString) {
    const inputDate = new Date(dateString);
    return formatDistanceToNow(inputDate, { addSuffix: true });
}
export default function SettingForm({ cluster }) {

    return (
        <div className="w-full h-max max-w-2xl mx-auto lg:mt-20 mb-5">
            <General cluster={cluster} />
            <div className="w-fumm max-w-xl mx-auto border-b border-input my-10" />
            <div className="mb-5">
                <h1 className="text-2xl font-bold">Cluster Members</h1>
            </div>
            <div className='border border-input rounded-lg overflow-hidden backdrop-blur-md'>
                <Table>
                    <TableHeader>
                        <TableRow className="border-input">
                            <TableHead className=" text-foreground" >User</TableHead>
                            <TableHead className=" text-foreground">Role</TableHead>
                            <TableHead className=" text-foreground">Join At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cluster.Membership.map((member) => (
                            <TableRow className="border-input">
                                <TableCell className="flex items-center justify-start gap-3">
                                    <Avatar className="border border-input shadow-sm">
                                        <AvatarImage className="object-cover " src={member.user?.image} />
                                        <AvatarFallback>T</AvatarFallback>
                                    </Avatar>
                                    {member.user.name}
                                </TableCell>
                                <TableCell >{member.role}</TableCell>
                                <TableCell >{timeAgo(member.createAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="w-fumm max-w-xl mx-auto border-b border-input my-10" />
            <Delete cluster={cluster} />
        </div>
    )
}


const General = ({ cluster }) => {

    const [name, setName] = useState(cluster.name)
    const [description, setDescription] = useState(cluster.description)
    const [pendding, startTransition] = useTransition()

    const router = useRouter()

    const handleSave = () => {
        if (!name) return toast.error("Cluster name should not be empty")
        try {
            startTransition(async () => {

                const data = {
                    name, description, clusterId: cluster.id
                }

                const clusterData = await fetch("/api/cluster", {
                    cache: "no-cache",
                    method: "PATCH",
                    body: JSON.stringify(data)
                })
                const clusterRes = await clusterData.json()

                if (clusterRes.success) {
                    router.refresh()
                } else {
                    return toast.error("Can't update Cluster : 500")
                }
            })
        } catch (e) {
            toast.error("Can't update Cluster : 500")
        }
    }

    return (
        <div className="space-y-5">
            <div className="mb-5">
                <h1 className="text-2xl font-bold">Cluster Info</h1>
            </div>
            <div className="">
                <p className="text-sm text-foreground/60">
                    Name
                </p>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent backdrop-blur" placeholder="Cluster name" />
            </div>
            <div className="">
                <p className="text-sm text-foreground/60">
                    Description
                </p>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} className="bg-transparent backdrop-blur" placeholder="Cluster description" />
            </div>
            <div className="">
                <p className="text-sm text-foreground/60">
                    Cluster ID
                </p>
                <Input disabled={true} value={cluster.id} className="bg-transparent backdrop-blur" />
            </div>
            <div className="w-full flex items-center justify-end">
                {pendding ?
                    <Button disabled className="disabled:opacity-100 bg-primary/60 dark:bg-transparent gap-1 items-center justify-center text-foreground font-medium " size="icon">
                        <Loader color="white" size={15} />
                    </Button>
                    : <Button onClick={handleSave} className="gap-2 items-center justify-center text-background font-medium bg-primary/70" >
                        Update cluster
                    </Button>}
            </div>
        </div>
    )
}

const Delete = ({ cluster }) => {

    const [name, setName] = useState("")
    const [pendding, startTransition] = useTransition()

    const router = useRouter()

    const handleSave = () => {
        if (name !== "Delete") return toast.error("Coformation not validPlease confirm deletion by entering 'Delete' in the prompt field.")
        try {
            startTransition(async () => {

                const data = {
                    clusterId: cluster.id
                }

                const clusterData = await fetch("/api/cluster", {
                    cache: "no-cache",
                    method: "DELETE",
                    body: JSON.stringify(data)
                })
                const clusterRes = await clusterData.json()

                if (await clusterRes.success) {
                    router.refresh()
                    router.push("/dashboard")
                } else {
                    return toast.error("Can't delete Cluster : 500")
                }
            })
        } catch (e) {
            toast.error("Can't delete Cluster : 500")
        }
    }

    return (
        <div >
            <div className="mb-">
                <h1 className="text-2xl font-bold text-destructive">Delete Cluster</h1>
            </div>
            <div className="">
                <p className="p-4 text-sm backdrop-blur text-destructive border border-destructive rounded-md">
                    Deleting the cluster will permanently erase all data stored within it, including templates, logs, and API keys.
                </p>
            </div>
            <div className="mb-5 mt-7">
                <p className="text-sm text-foreground/60">
                    Type <span className="font-bold">Delete</span> to confirm
                </p>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent backdrop-blur" placeholder="Cluster name" />
            </div>
            <div className="w-full flex items-center justify-end">
                {pendding ?
                    <Button disabled className="disabled:opacity-100 bg-destructive/60 dark:bg-transparent gap-1 items-center justify-center text-foreground font-medium " size="icon">
                        <Loader color="white" size={15} />
                    </Button>
                    : <Button onClick={handleSave} variant="destructive" className="gap-2 items-center justify-center " >
                        Delete cluster
                    </Button>}
            </div>
        </div>
    )
}