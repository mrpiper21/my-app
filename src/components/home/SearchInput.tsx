import { Colors, Spacing } from "@/constants/theme"
import { Ionicons } from "@expo/vector-icons"
import { TextInput } from "react-native"
import { ThemedView } from "../themed-view"

const SearchInput = () => {
    return (
        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.two, backgroundColor: Colors.light.card, padding: Spacing.two, borderRadius: Spacing.two }}>
            <Ionicons color={Colors.light.textSecondary} name="search" size={24} />
            <TextInput placeholder="Search movies TV shows" style={{ flex: 1 }} />
        </ThemedView>
    )
}

export default SearchInput