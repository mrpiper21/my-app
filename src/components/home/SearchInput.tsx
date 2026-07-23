import { Colors, Spacing } from "@/constants/theme"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native"
import { ThemedView } from "../themed-view"

interface SearchInputProps {
    placeholder?: string
    onChangeText?: (text: string) => void
    value?: string,
    style?: StyleProp<ViewStyle>
}

const SearchInput: FC<SearchInputProps> = ({ placeholder, onChangeText, value, style }) => {
    return (
        <ThemedView style={[styles.container, style]}>
            <Ionicons color={Colors.light.textSecondary} name="search" size={24} />
            <TextInput
                placeholderTextColor="white"
                placeholder={placeholder}
                style={{ flex: 1 }}
                onChangeText={onChangeText}
                value={value}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, backgroundColor: Colors.light.card, padding: Spacing.two, borderRadius: Spacing.two }
})

export default SearchInput