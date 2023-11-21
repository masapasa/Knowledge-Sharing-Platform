import type { NextApiRequest, NextApiResponse } from 'next'
import { adminAuth } from '../../../../utils/firebaseAdminInit'
import { prisma } from '../../../../utils/prismaClientInit'

export default async function noteUpvoteHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, headers, body, query } = req

    switch (method) {
        case 'POST':
            if (headers && headers.authorization) {
                const accessToken = headers.authorization.split(' ')[1]
                const user = await adminAuth.verifyIdToken(accessToken!)

                if (user) {
                    try {
                        const { user_id } = user
                        const { note_id } = body

                        await prisma.note_upvote.create({
                            data: {
                                note_id,
                                user_id,
                            },
                        })

                        res.status(200).json({
                            message: 'Upvoted',
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
        case 'DELETE':
            if (headers && headers.authorization) {
                const accessToken = headers.authorization.split(' ')[1]
                const user = await adminAuth.verifyIdToken(accessToken!)

                if (user) {
                    try {
                        const { user_id } = user
                        const { id } = query

                        await prisma.note_upvote.deleteMany({
                            where: {
                                user_id,
                                note_id: parseInt(id as string),
                            },
                        })

                        res.status(200).json({
                            message: 'Upvote Removed',
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
        default:
            res.status(405).json({
                message: 'Method Not Allowed',
            })
    }
}
