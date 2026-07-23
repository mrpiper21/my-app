import { auth } from "@/config/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

export async function signInService({ email, password }: { email: string, password: string }) {
    const userCredential = signInWithEmailAndPassword(auth, email, password)
    console.log("----------- ", JSON.stringify(await (await userCredential).user, null, 2))
    return await (await userCredential).user
}