import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
// import LoginBackgroundImage from "@/assets/images/login-background-image.jpeg"
import { useLogin } from "@/hooks/auth-hooks"
import { Image } from "expo-image"
import { router } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"


const LoginScreen = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const loginMuation = useLogin()

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
                        <Text style={styles.welcome}>Welcome back!</Text>
                        <Text style={styles.subtitle}>Sign in to continue</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.label}>Email</Text>
                        <Input onChangeText={(text) => setEmail(text)} type="email" placeholder="Enter your email" placeholderTextColor="#ccc" />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.label}>Password</Text>
                        <Input onChangeText={(text) => setPassword(text)} type="password" placeholder="Enter your password" placeholderTextColor="#ccc" />
                    </View>
                    <View style={{ marginTop: 20, alignItems: "flex-end" }}>
                        <Text style={{ color: "yellow" }}>Forgot your password?</Text>
                    </View>
                    <Button loading={loginMuation.isPending} onPress={() => loginMuation.mutate({ email, password })} style={{ marginTop: 20 }} text="Sign In" />
                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: 'white' }}>Don't have an account? </Text>
                        <Text style={{ color: "yellow" }} onPress={() => router.push("/(auth)/register")}>Sign Up</Text>
                    </View>
                </View>
            </View>
            {/* <CustomToast message="Login Successfull" visible={showToast} /> */}
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

export default LoginScreen