import SearchInput from "@/components/home/SearchInput"
import { ThemedView } from "@/components/themed-view"
import { Spacing } from "@/constants/theme"
import { useGetMovies } from "@/hooks/movie-hook"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router } from "expo-router"
import { useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Tabs from "./_components/tabs"
import { tabItems } from "./_constants"

export type TActiveTab = "all" | "movies" | "Tv-show"



const Index = () => {

    const [activeTab, setActiveTab] = useState<TActiveTab>("all")
    const { data } = useGetMovies()

    const handleActiveTabs = (_activeTab: TActiveTab) => {
        setActiveTab(_activeTab)
    }
    const tabs = tabItems(handleActiveTabs)
    return (
        <ThemedView style={styles.container}>
            <SearchInput style={{ marginTop: Spacing.six }} />
            {/**Tabs */}
            <Tabs activeTab={activeTab} tabs={tabs} />
            <FlatList
                style={{ paddingBottom: 500 }}
                contentContainerStyle={{ gap: Spacing.two }}
                data={data}
                renderItem={(movie) => (
                    <TouchableOpacity onPress={() => router.push(`/${movie.item.id}`)} activeOpacity={0.7} key={movie.item.id} style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 120, width: 100 }} source={{ uri: movie.item.posterUrl }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ padding: 16 }}>
                                <Text style={{ color: "white" }}>{movie.item.title}</Text>
                                <Text style={{ color: "white" }}>{movie.item.description}</Text>
                            </View>
                            <Ionicons size={24} color={"yellow"} name="star" />
                        </View>
                    </TouchableOpacity>
                )} />
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