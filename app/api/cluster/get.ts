import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/Options"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAllCluster = async () => {

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
        }
    })

    return {
        success: true,
        clusters
    }
}


export const getSingleProject = async (clusterId: any) => {
    const { user: { id } }: any = await getServerSession(options)

    const cluster = await prisma.cluster.findUnique({
        where: {
            id: clusterId,
            Membership: {
                some: {
                    userId: id
                }
            }
        }
    })

    return {
        success: true,
        cluster
    }
}

export const getSingleClusterKeys = async (clusterId: any) => {
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
        include: {
            apiKey: {
                orderBy: {
                    createAt: "desc"
                },
            }
        }
    })

    return {
        success: true,
        cluster
    }
}



export const getSingleClusterLogs = async (clusterId: any) => {
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
        include: {
            logs: {
                orderBy: {
                    createAt: "desc"
                },
                include: {
                    context: {
                        orderBy: {
                            createAt: "desc"
                        },
                    }
                }
            }
        }
    })

    return {
        success: true,
        cluster
    }
}



export const getAllClusterMembership = async (clusterId: any) => {
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
        include: {
            Membership: {
                include: {
                    user: true
                },
                orderBy: {
                    createAt: "asc"
                }
            }
        }
    })

    return {
        success: true,
        cluster
    }
}