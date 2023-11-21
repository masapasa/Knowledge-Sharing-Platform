import { toast } from 'react-hot-toast'
import { api } from '../../../utils/api'

interface Props {
    id: number
    title: string
    subjectCode: string
    semester: string
    instructorId: number
    branch: string
    url: string
    isAnonymous: boolean
    refetch: Function
}

export const updateNote = ({
    id,
    title,
    subjectCode,
    branch,
    instructorId,
    isAnonymous,
    refetch,
    semester,
    url,
}: Props) => {
    toast.promise(
        api.put('/api/db/notes?id=' + id, {
            title,
            subjectCode,
            semester,
            instructorId,
            branch,
            url,
            isAnonymous,
        }),
        {
            loading: 'Updating...',
            success: (res) => {
                refetch()
                return `${res.data.message}`
            },
            error: (err) => `Error: ${err.message}`,
        }
    )
}
