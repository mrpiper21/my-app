import { Colors, Spacing } from "@/constants/theme"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { TextInput } from "react-native"
import { ThemedView } from "../themed-view"

interface SearchInputProps {
    placeholder?: string
    onChangeText?: (text: string) => void
    value?: string
}

const SearchInput: FC<SearchInputProps> = ({ placeholder, onChangeText, value }) => {
    return (
        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.two, backgroundColor: Colors.light.card, padding: Spacing.two, borderRadius: Spacing.two }}>
            <Ionicons color={Colors.light.textSecondary} name="search" size={24} />
            <TextInput
                placeholder={placeholder}
                style={{ flex: 1 }}
                onChangeText={onChangeText}
                value={value}
            />
        </ThemedView>
    )
}

export default SearchInput