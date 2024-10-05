//@ts-nocheck
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { name, clusterId } = await req.json()

    const Membership = await prisma.membership.findFirst({
        where: {
            clusterId: clusterId,
            userId: id
        }
    })

    if (!Membership) {
        return {
            success: false
        }
    }

    const newKey = await prisma.apiKey.create({
        data: {
            clusterId: clusterId,
            name: name
        }
    })

    return NextResponse.json({
        success: true,
        newKey
    })
}

export const PUT = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { name, clusterId, keyId } = await req.json()

    const Membership = await prisma.membership.findFirst({
        where: {
            clusterId: clusterId,
            userId: id
        }
    })

    if (!Membership) {
        return {
            success: false
        }
    }

    const newKey = await prisma.apiKey.update({
        where: {
            clusterId: clusterId,
            id: keyId
        },
        data: {
            name: name
        }
    })

    return NextResponse.json({
        success: true,
        newKey
    })
}


export const DELETE = async (req: Request) => {
    const { user: { id } }: any = await getServerSession(options)
    const { key, clusterId } = await req.json()

    const Membership = await prisma.membership.findFirst({
        where: {
            clusterId: clusterId,
            userId: id
        }
    })

    if (!Membership) {
        return {
            success: false
        }
    }

    await prisma.apiKey.delete({
        where: {
            id: key
        }
    })


    return NextResponse.json({
        success: true,
    })
}