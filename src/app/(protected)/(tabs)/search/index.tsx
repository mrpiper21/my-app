import SearchInput from "@/components/home/SearchInput"
import { ThemedView } from "@/components/themed-view"
import { MaxContentWidth, Spacing } from "@/constants/theme"
import { useGetMovies } from "@/hooks/movie-hook"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router } from "expo-router"
import { useMemo, useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import Tabs from "./_components/tabs"
import { tabItems } from "./_constants"

export type TActiveTab = "all" | "movies" | "Tv-show"

const POSTER_ASPECT_RATIO = 120 / 100

const Index = () => {

    const [activeTab, setActiveTab] = useState<TActiveTab>("all")
    const { data } = useGetMovies()
    const { width: windowWidth } = useWindowDimensions()

    const posterWidth = useMemo(() => {
        const containerWidth = Math.min(windowWidth, MaxContentWidth) - Spacing.four * 2
        return Math.min(100, containerWidth * 0.28)
    }, [windowWidth])

    const handleActiveTabs = (_activeTab: TActiveTab) => {
        setActiveTab(_activeTab)
    }
    const tabs = tabItems(handleActiveTabs)
    return (
        <ThemedView style={styles.container}>
            <View style={styles.content}>
                <SearchInput style={{ marginTop: Spacing.six }} />
                {/**Tabs */}
                <Tabs activeTab={activeTab} tabs={tabs} />
                <FlatList
                    contentContainerStyle={{ gap: Spacing.two, paddingBottom: Spacing.six }}
                    data={data}
                    keyExtractor={(movie) => movie.id}
                    renderItem={({ item: movie }) => (
                        <TouchableOpacity onPress={() => router.push(`/${movie.id}`)} activeOpacity={0.7} style={{ flexDirection: 'row' }}>
                            <Image style={{ height: posterWidth * POSTER_ASPECT_RATIO, width: posterWidth }} source={{ uri: movie.posterUrl }} />
                            <View style={{ flex: 1, minWidth: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <View style={{ flex: 1, minWidth: 0, padding: 16 }}>
                                    <Text style={{ color: "white" }} numberOfLines={1} ellipsizeMode="tail">{movie.title}</Text>
                                    <Text style={{ color: "white" }} numberOfLines={2} ellipsizeMode="tail">{movie.description}</Text>
                                </View>
                                <View style={{ alignItems: "center", gap: 4 }}>
                                    <Ionicons style={{ marginTop: 16 }} size={24} color={"yellow"} name="star" />
                                    <Text style={{ color: "white" }}>{movie.rating}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )} />
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    content: {
        flex: 1,
        width: '100%',
        maxWidth: MaxContentWidth,
        alignSelf: 'center',
    }
})

export default Index