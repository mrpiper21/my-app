import { useUserStore } from "@/store/user-store"
import { Stack } from "expo-router"

const RootNavigator = () => {
    const { session } = useUserStore()

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(auth)" />
            </Stack.Protected>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(protected)" />
            </Stack.Protected>
        </Stack>
    )
}

export default RootNavigator