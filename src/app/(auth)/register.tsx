import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { auth } from "@/config/firebaseConfig"
import { useSession } from "@/context/AuthContext"
import { Image } from "expo-image"
import { router } from "expo-router"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"



const RegisterScreen = () => {
    const { signIn } = useSession()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleRegister = async () => {
        setIsLoading(true)
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            signIn(await userCredentials.user.getIdToken())
            console.log("-----> user", userCredentials.user)
            setIsLoading(false)
        } catch (error) {
            console.error("register error ---> ", error)
            setIsLoading(false)
        }
    }

    return (
        <ThemedView style={styles.container}>
            <Image source={require('@/assets/images/login-background-image.jpeg')} style={{ width: '100%', height: '100%' }} />
            <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(1, 1, 1, 0.5)' }}>

                <View style={styles.titleContainer} >
                    <Text style={styles.title}>Movie Flix</Text>
                    <ThemedText style={styles.subtitle}>Discover . Watch . Love</ThemedText>
                </View>

                <View style={styles.formContainer}>
                    <View style={{ alignItems: "flex-start" }}>
                        <Text style={styles.welcome}>Create an account</Text>
                        <Text style={styles.subtitle}>Sign up to get started</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.label}>Name</Text>
                        <Input placeholder="Enter your name" placeholderTextColor="#ccc" value={name} onChangeText={setName} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.label}>Email</Text>
                        <Input type="email" placeholder="Enter your email" placeholderTextColor="#ccc" value={email} onChangeText={setEmail} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.label}>Password</Text>
                        <Input type="password" placeholder="Enter your password" placeholderTextColor="#ccc" secureTextEntry value={password} onChangeText={setPassword} />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <Input type="password" placeholder="Re-enter your password" placeholderTextColor="#ccc" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
                    </View>
                    <Button loading={isLoading} onPress={handleRegister} style={{ marginTop: 20 }} text="Sign Up" />
                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }}>Already have an account? </Text>
                        <Text style={{ color: "yellow" }} onPress={() => router.replace("/(auth)")}>Sign In</Text>
                    </View>
                </View>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#151A21',
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
})

export default RegisterScreen
