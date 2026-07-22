import { IMovie } from "@/@types/home"
import { Colors, Spacing } from "@/constants/theme"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router } from "expo-router"
import { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { ThemedText } from "../themed-text"
import { ThemedView } from "../themed-view"

interface IMovieProps {
    movie: IMovie
}

const MovieItem: FC<IMovieProps> = ({ movie }) => {
    return (
        <TouchableOpacity onPress={() => router.push(`/(protected)/${movie.id}`)} activeOpacity={0.7} key={movie.id} style={{ gap: Spacing.three, marginVertical: Spacing.two }}>
            <Image source={{ uri: movie.posterUrl }} style={{ width: 110, height: 150, backgroundColor: Colors.light.card, borderRadius: Spacing.two }} />
            <ThemedView>
                <ThemedText style={{ color: "white" }}>{movie.title}</ThemedText>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Ionicons name="star" color="#F5C451" size={16} />
                    <ThemedText style={{ color: "white" }}>{movie.rating}</ThemedText>
                </View>
            </ThemedView>
        </TouchableOpacity>
    )
}

export default MovieItem