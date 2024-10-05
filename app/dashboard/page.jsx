import Loader from "@/components/loader"
import { Suspense } from "react"
import { getAllCluster } from "../api/cluster/get"
import { Button } from "@/components/ui/button"
import { Plus, Home } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns';
import str from "string-to-color"

function timeAgo(dateString) {
    const inputDate = new Date(dateString);
    return formatDistanceToNow(inputDate, { addSuffix: true });
}


export const metadata = {
    title: 'Clusters - Type AI',
}


export default function page() {

    return (
        <Suspense fallback={<Loader />}>
            <DataProvider />
        </Suspense>
    )
}

const DataProvider = async () => {

    const { clusters } = await getAllCluster()

    if (clusters.length <= 0) return <div className="h-full w-full items-center justify-center flex p-5">
        <div className="h-mlax py-8 px-5 w-full border-input rounded-lg border-dashed backdrop-blur-md border-2 max-w-2xl flex items-center justify-center flex-col">
            <h1 className="text-xl font-bold">
                No clusters have been created yet</h1>
            <p className="text-sm font-light text-foreground/70 -mt-0.5">Create a new cluster to access a variety of AI features.</p>
            <Link href={"/dashboard/new"} className="mt-5">
                <Button className="gap-2 hover:border-transparent" variant="outline">
                    <Plus size={19} />
                    New cluster
                </Button>
            </Link>
        </div>
    </div>

    const gradientColors = (pro)=> `linear-gradient(to right, ${str(pro.name.trim())}, ${str(pro.name.trim()+" ")})`;

    return (
        <div className="w-full max-w-5xl mx-auto lg:mt-7 lg:p-5 p-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-max gap-2">
            <div className="col-span-full w-full flex items-center justify-end h-16">
                <div className="flex w-max items-center justify-center gap-1">
                    <Link href={"/dashboard/new"}>
                        <Button className="gap-2 hover:border-transparent" variant="outline">
                            <Plus size={19} />
                            New cluster
                        </Button>
                    </Link>
                </div>
            </div>
            {clusters.map((pro) => (
                <div className="h-full w-full border border-input p-3 rounded-xl bg-background">
                    <div style={{ background: gradientColors(pro)}} className="rounded h-12 mb-0.5" />
                    <h1 className="text-lg font-semibold">{pro.name}</h1>
                    <p className="text-sm font-light text-foreground/60 -mt-1">{timeAgo(pro.createAt)}</p>
                    <div className="w-full flex items-center justify-end gap-1 mt-4">
                        <Link href={`/dashboard/${pro.id}`}>
                            <Button size="sm" className="gap-2 text-primary hover:text-foreground bg-primary/10 hover:bg-primary/70">
                                <Home size={17} />
                                Overview
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}