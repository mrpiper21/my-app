import { uploadMovie } from "@/api/movies"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useUploadMove = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: uploadMovie,
        onSettled(data, error, variables, onMutateResult, context) {
            if (error) {
                console.log("upload movie error -----> ", error)
                return
            }
            console.log("movie -----> ", data)
        },
    })
}