import { deleteMovie, getMovie, getMovies, uploadMovie } from "@/api/movies"
import { useUserStore } from "@/store/user-store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useUploadMove = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: uploadMovie,
        onSettled(data, error, variables, onMutateResult, context) {
            if (error) {
                console.log("upload movie error -----> ", error)
                return
            }
            queryClient.invalidateQueries({ queryKey: ["movies"] })
        },
    })
}

export const useGetMovies = () => {
    const { user } = useUserStore()
    const userId = user?._id

    const { isPending, error, data } = useQuery({
        queryKey: ['movies', userId],
        queryFn: () => getMovies(userId as string),
        enabled: !!userId
    })

    return { isPending, error, data }

}

export const useGetMovie = (movieId: string) => {
    const { isPending, data, ...rest } = useQuery({
        queryKey: ['movie', movieId],
        queryFn: () => getMovie(movieId)
    })

    return { isPending, data, ...rest }
}

export const useDeleteMovie = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteMovie,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] })
        },
    })
}