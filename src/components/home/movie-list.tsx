import { IMovieList } from "@/@types/home"
import { Colors, Spacing } from "@/constants/theme"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { ThemedText } from "../themed-text"
import { ThemedView } from "../themed-view"


const MovieList: FC<IMovieList> = ({ movies }) => {
    return (
        <ThemedView style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2, marginVertical: Spacing.two }}>
            {movies.map((movie) => (
                <TouchableOpacity activeOpacity={0.7} key={movie.id} style={{ gap: Spacing.three, marginVertical: Spacing.two }}>
                    <Image source={{ uri: movie.posterUrl }} style={{ width: 110, height: 150, backgroundColor: Colors.light.card, borderRadius: Spacing.two }} />
                    <ThemedView>
                        <ThemedText style={{ color: "white" }}>{movie.title}</ThemedText>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Ionicons name="star" color="#F5C451" size={16} />
                            <ThemedText style={{ color: "white" }}>{movie.rating}</ThemedText>
                        </View>
                    </ThemedView>
                </TouchableOpacity>
            ))}
        </ThemedView>
    )
}

export default MovieList