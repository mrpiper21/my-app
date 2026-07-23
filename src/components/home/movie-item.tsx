import { IMovie } from "@/@types/home"
import { Colors, Spacing } from "@/constants/theme"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router } from "expo-router"
import { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { ThemedText } from "../themed-text"
import { ThemedView } from "../themed-view"

const POSTER_ASPECT_RATIO = 150 / 110

interface IMovieProps {
    movie: IMovie
    width?: number
}

const MovieItem: FC<IMovieProps> = ({ movie, width = 110 }) => {
    return (
        <TouchableOpacity onPress={() => router.push(`/(protected)/${movie.id}`)} activeOpacity={0.7} style={{ width, gap: Spacing.two }}>
            <Image
                source={{ uri: movie.posterUrl }}
                style={{ width, height: width * POSTER_ASPECT_RATIO, backgroundColor: Colors.light.card, borderRadius: Spacing.two }}
            />
            <ThemedView>
                <ThemedText style={{ color: "white" }} numberOfLines={1} ellipsizeMode="tail">{movie.title}</ThemedText>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Ionicons name="star" color="#F5C451" size={16} />
                    <ThemedText style={{ color: "white" }}>{movie.rating}</ThemedText>
                </View>
            </ThemedView>
        </TouchableOpacity>
    )
}

export default MovieItem