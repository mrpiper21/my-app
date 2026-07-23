import SearchInput from "@/components/home/SearchInput"
import { ThemedView } from "@/components/themed-view"
import { Spacing } from "@/constants/theme"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Tabs from "./_components/tabs"
import { tabItems } from "./_constants"

export type TActiveTab = "all" | "movies" | "Tv-show"



const Index = () => {

    const [activeTab, setActiveTab] = useState<TActiveTab>("all")

    const handleActiveTabs = (_activeTab: TActiveTab) => {
        setActiveTab(_activeTab)
    }
    const tabs = tabItems(handleActiveTabs)
    return (
        <ThemedView style={styles.container}>
            <SearchInput style={{ marginTop: Spacing.six }} />
            {/**Tabs */}
            <Tabs activeTab={activeTab} tabs={tabs} />

            <View>
                <Text>Hllo</Text>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    }
})

export default Index