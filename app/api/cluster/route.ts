//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"
import Randrom from "randomstring"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    console.log("-----------------------")
    const { user: { id } }: any = await getServerSession(options)

    console.log(await getServerSession(options))
    console.log("-----------------------")

    const { name } = await req.json()
    const blankField = { name: "answer", type: "string", description: "answer to the user's question" }

    const newCluster = await prisma.cluster.create({
        data: {
            name: name,
            shortId: Randrom.generate(7),
            template: "{question}",
            outputType: JSON.stringify([blankField]),
            Membership: {
                create: {
                    role: "owner",
                    userId: id
                }
            }
        }
    })

    return NextResponse.json({
        success: true,
        newCluster
    })
}


export const PUT = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { template, outputType, clusterId } = await req.json()

    const newCluster = await prisma.cluster.update({
        where: {
            id: clusterId,
            Membership: {
                some: {
                    userId: id
                }
            }
        },
        data: {
            template: template,
            outputType: JSON.stringify(outputType)
        }
    })

    return NextResponse.json({
        success: true,
        newCluster
    })
}


export const PATCH = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { name, description, clusterId } = await req.json()

    const newCluster = await prisma.cluster.update({
        where: {
            id: clusterId,
            Membership: {
                some: {
                    userId: id
                }
            }
        },
        data: {
            name: name,
            description: description
        }
    })

    return NextResponse.json({
        success: true,
        newCluster
    })
}


export const DELETE = async (req: Request) => {
    const x = await getServerSession(options)
    console.log(x)

    const { user: { id } }: any = await getServerSession(options)
    const { clusterId } = await req.json()

    const cluster = await prisma.cluster.delete({
        where: {
            id: clusterId,
            Membership: {
                some: {
                    userId: id
                }
            }
        }
    })

    revalidatePath("/dashboard")

    return NextResponse.json({
        success: true,
    })
}
