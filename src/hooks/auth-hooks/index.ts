import { signInService } from "@/api/auth"

const useLogin = () => {
    const token = signInService({ email, password })
}