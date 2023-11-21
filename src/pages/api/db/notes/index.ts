import type { NextApiRequest, NextApiResponse } from 'next'
import { adminAuth } from '../../../../utils/firebaseAdminInit'
import { prisma } from '../../../../utils/prismaClientInit'

export default async function noteHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, headers, body, query } = req

    switch (method) {
        case 'GET':
            try {
                const notes = await prisma.note.findMany({
                    include: {
                        subject: {
                            select: {
                                name: true,
                            },
                        },
                        instructor: {
                            select: {
                                name: true,
                            },
                        },
                        created_by: {
                            select: {
                                name: true,
                            },
                        },
                        upvotes: {
                            select: {
                                user_id: true,
                            },
                        },
                        _count: {
                            select: {
                                upvotes: true,
                            },
                        },
                    },
                })
                res.status(200).json({
                    message: 'Notes Fetched',
                    result: notes,
                })
            } catch (err: any) {
                console.log(err)
                res.status(405).json({
                    err,
                })
            }
            break

        case 'POST':
            if (headers && headers.authorization) {
                const accessToken = headers.authorization.split(' ')[1]
                const user = await adminAuth.verifyIdToken(accessToken!)

                if (user) {
                    const {
                        title,
                        subjectCode,
                        semester,
                        branch,
                        instructorId,
                        url,
                        isAnonymous,
                    } = body
                    try {
                        await prisma.note.create({
                            data: {
                                title,
                                subject_code: subjectCode,
                                branch,
                                semester,
                                instructor_id: parseInt(instructorId),
                                url,
                                anonymous: isAnonymous,
                                created_by_id: user.user_id,
                            },
                        })
                        res.status(201).json({
                            message: 'Notes Created',
                        })
                    } catch (err: any) {
                        console.log(err)
                        res.status(405).json({
                            err,
                        })
                    }
                } else {
                    res.status(401).json({
                        message: 'Unauthorized Access',
                    })
                }
            } else {
                res.status(401).json({
                    message: 'Unauthorized Access',
                })
            }
            break

        case 'PUT':
            if (headers && headers.authorization) {
                const accessToken = headers.authorization.split(' ')[1]
                const user = await adminAuth.verifyIdToken(accessToken!)

                if (user) {
                    try {
                        const { id } = query

                        const {
                            title,
                            subjectCode,
                            semester,
                            branch,
                            instructorId,
                            url,
                            isAnonymous,
                        } = body

                        const notes = await prisma.note.findUnique({
                            where: {
                                id: parseInt(id as string),
                            },
                        })

                        if (notes) {
                            if (user.user_id === notes.created_by_id) {
                                await prisma.note.update({
                                    where: {
                                        id: parseInt(id as string),
                                    },
                                    data: {
                                        title,
                                        subject_code: subjectCode,
                                        branch,
                                        semester,
                                        instructor_id: instructorId,
                                        url,
                                        anonymous: isAnonymous,
                                        created_by_id: user.user_id,
                                    },
                                })

                                res.status(200).json({
                                    message: 'Notes Updated',
                                })
                            } else {
                                res.status(405).json({
                                    message: 'Unauthorized Access',
                                })
                            }
                        } else {
                            res.status(404).json({
                                message: 'No Notes Found',
                            })
                        }
                    } catch (err: any) {
                        console.log(err)
                        res.status(405).json({
                            err,
                        })
                    }
                }
            } else {
                res.status(401).json({
                    message: 'Unauthorized Access',
                })
            }
            break
        case 'DELETE':
            if (headers && headers.authorization) {
                const accessToken = headers.authorization.split(' ')[1]
                const user = await adminAuth.verifyIdToken(accessToken!)

                if (user) {
                    try {
                        const { id } = query

                        const notes = await prisma.note.findUnique({
                            where: {
                                id: parseInt(id as string),
                            },
                        })

                        if (notes) {
                            if (user.user_id === notes.created_by_id) {
                                await prisma.note.delete({
                                    where: {
                                        id: parseInt(id as string),
                                    },
                                })

                                res.status(200).json({
                                    message: 'Notes Deleted Successfully',
                                })
                            } else {
                                res.status(405).json({
                                    message: 'Unauthorized Access',
                                })
                            }
                        } else {
                            res.status(404).json({
                                message: 'No Notes Found',
                            })
                        }
                    } catch (err: any) {
                        console.log(err)
                        res.status(405).json({
                            err,
                        })
                    }
                } else {
                    res.status(401).json({
                        message: 'Unauthorized Access',
                    })
                }
            } else {
                res.status(401).json({
                    message: 'Unauthorized Access',
                })
            }
            break
        default:
            res.status(405).json({
                message: 'Method Not Allowed',
            })
    }
}
