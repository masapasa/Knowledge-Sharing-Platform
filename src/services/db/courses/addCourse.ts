import { toast } from 'react-hot-toast'
import { api } from '../../../utils/api'

interface Props {
    title: string
    code: string
    instructorId: number
    isAnonymous: boolean
    refetch: Function
}

export const addCourse = ({
    title,
    code,
    instructorId,
    isAnonymous,
    refetch,
}: Props) => {
    toast.promise(
        api.post('/api/db/courses', {
            title,
            code,
            instructorId,
            isAnonymous,
        }),
        {
            loading: 'Adding...',
            success: (res) => {
                refetch()
                return `${res.data.message}`
            },
            error: (err) => `Error: ${err.message}`,
        }
    )
}
