import Loader from "@/components/loader"
import { Suspense } from "react"
import { getSingleClusterKeys } from "../../../api/cluster/get"
import ApiForm from "@/components/ApiForm"
import { getClusterName } from "@/app/api/seo/get"

export default function page({ params }) {

    return (
        <Suspense fallback={<Loader />}>
            <DataProvider params={params} />
        </Suspense>
    )
}

const DataProvider = async ({ params }) => {

    const { cluster } = await getSingleClusterKeys(params.cluster)

    if(!cluster) return <div className="h-full w-full flex items-center justify-center flex-col p-5">
        <h1 className="font-bold text-6xl text-primary">404</h1>
        <p className="text-foreground/70">Cluster not found !</p>
    </div>

    return (
       <ApiForm cluster={cluster} url={process.env.ROOT_URL}/> 
    )
}

export async function generateMetadata({ params }) {

    const {cluster} = await getClusterName(params.cluster)
    const slug = "API"

    return {
        title: cluster ? cluster.name +" - "+ slug : "404 - Not Found" ,
    }
}