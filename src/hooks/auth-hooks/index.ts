import { signInService } from "@/api/auth"
import { useUserStore } from "@/store/user-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogin = () => {
    const queryClient = useQueryClient()
    const { updateSession, updateUser } = useUserStore()
    return useMutation({
        mutationFn: signInService,
        onSuccess(data, variables, onMutateResult, context) {
            data.getIdToken().then((res) => {
                updateSession(res.toString())
                updateUser({ email: data?.email as string, name: data?.displayName as string, phoneNumber: data?.phoneNumber as string, _id: data.uid })
            })
            queryClient.invalidateQueries({ queryKey: ['movies'] })
        },
    })
}