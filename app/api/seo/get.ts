import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAllSmallCluster = async () => {

    const { user: { id } }: any = await getServerSession(options)

    const clusters = await prisma.cluster.findMany({
        where: {
            Membership: {
                some: {
                    userId: id
                }
            }
        },
        orderBy: {
            createAt: "desc"
        },
        select: {
            id: true,
            name: true
        }
    })

    return {
        success: true,
        clusters
    }
}

export const getClusterName = async (clusterId: string) => {

    const { user: { id } }: any = await getServerSession(options)

    const cluster = await prisma.cluster.findUnique({
        where: {
            id: clusterId,
            Membership: {
                some: {
                    userId: id
                }
            }
        },
        select: {
            id: true,
            name: true
        }
    })

    return {
        success: true,
        cluster
    }
}
