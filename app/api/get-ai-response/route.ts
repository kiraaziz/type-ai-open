//@ts-nocheck
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { headers } from "next/headers"
import { OutputResponse, generateZodTypeFromJSON } from "../cluster/run/route"
import { extractTextInCurlyBraces } from "@/hooks/useTools"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {

    try {
        const { tokens } = await req.json()
        const headersList = headers();
        const referer = headersList.get("apiKey")?.replace("TA_", "")

        const cluster = await prisma.cluster.findFirst({
            where: {
                apiKey: {
                    some: {
                        id: referer
                    }
                }
            }
        })

        if (!cluster) {
            throw Error("There is no cluster with this API KEY!")
        }

        if (!tokens) {
            throw Error("Tokens not fond in body!")
        }

        const errorMessage = extractTextInCurlyBraces(cluster.template).map((el) => {
            if (!tokens[el]) {
                return { [el]: "Value required" }
            }
        }).filter((el) => { return el })

        if (errorMessage.length > 0) {
            throw Error(JSON.stringify(errorMessage))
        }

        const inputs = Object.keys(tokens).map((to) => { return { name: to, value: tokens[to] } })

        const response = await OutputResponse(cluster.template, inputs, JSON.parse(cluster?.outputType))

        var currentDate = new Date()
        var isoDate = currentDate.toISOString()

        const log = await prisma.logs.findFirst({
            where: {
                clusterId: cluster.id,
                date: isoDate.split('T')[0]
            }
        })

        if (!log) {
            await prisma.apiKey.update({
                where: {
                    id: referer
                },
                data: {
                    logs: {
                        create: {
                            date: isoDate.split('T')[0],
                            clusterId: cluster.id,
                            value: 1,
                            context: {
                                create: {
                                    value: JSON.stringify({ tokens: tokens, response: response }),
                                }
                            }
                        }
                    }
                }
            })
        } else {
            await prisma.logs.update({
                where: {
                    id: log?.id
                },
                data: {
                    value: log.value + 1,
                    context: {
                        create: {
                            value: JSON.stringify({ tokens: tokens, response: response }),
                        }
                    }
                }
            })
        }

        return NextResponse.json({
            success: true, response, tokens
        })
    } catch (e) {
        return NextResponse.json({
            success: false, message: e.message
        })
    }
}
