import { auth } from "@/config/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

export async function signInService({ email, password }: { email: string, password: string }) {
    const userCredential = signInWithEmailAndPassword(auth, email, password)
    return (await (await userCredential).user.getIdToken())
}