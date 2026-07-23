import Casts from "@/components/movie-detail/Casts"
import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"
import Button from "@/components/ui/Button"
import CustomHeader from "@/components/ui/custom-header"
import { Spacing } from "@/constants/theme"
import { useDeleteMovie, useGetMovie } from "@/hooks/movie-hook"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router, useLocalSearchParams } from "expo-router"
import { Alert, StyleSheet, Text, View } from "react-native"

const person = [
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK-8MTYUM64Ktu8jcQSOmFrISGVDKfCa307rn7g5AaYw&s=10",
        name: "Bernard Baah",
        role: "Software Engineer"
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK-8MTYUM64Ktu8jcQSOmFrISGVDKfCa307rn7g5AaYw&s=10",
        name: "Bernard Baah",
        role: "Software Engineer"
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK-8MTYUM64Ktu8jcQSOmFrISGVDKfCa307rn7g5AaYw&s=10",
        name: "Bernard Baah",
        role: "Software Engineer"
    },
]

const MovieDetailScreen = () => {
    const { movieId } = useLocalSearchParams()
    const { data: movieDetail, isFetching } = useGetMovie(movieId as string)
    const deleteMovieMutation = useDeleteMovie()

    const handleDelete = () => {
        Alert.alert(
            "Delete movie",
            "Are you sure you want to delete this movie? This can't be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteMovieMutation.mutate(movieId as string, {
                            onSuccess: () => router.back(),
                            onError: (error) => Alert.alert("Couldn't delete movie", error.message),
                        })
                    },
                },
            ]
        )
    }

    if (isFetching) return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'black' }}>
        <Text style={{ color: "white" }}>Loading...</Text>

    </View>
    return (
        <ThemedView style={{ flex: 1 }}>

            <View style={{ display: "flex", flex: 1 }}>
                <Image style={{ height: 350, width: "100%" }} source={{ uri: movieDetail?.posterUrl }} />
                <CustomHeader
                    style={{ position: "absolute", top: Spacing.six, left: 0, right: 0 }}
                    leftIcon={<Ionicons style={{ padding: 8, borderRadius: 150, backgroundColor: 'rgba(1, 1, 1, 0.5)' }} onPress={() => router.back()} size={24} color="white" name="chevron-back" />}
                    title=""
                    rightIcon={
                        <Ionicons
                            style={{ padding: 8, borderRadius: 150, backgroundColor: 'rgba(1, 1, 1, 0.5)' }}
                            onPress={handleDelete}
                            size={24}
                            color="#ff5c5c"
                            name="trash"
                        />
                    }
                />
                <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
                    <View style={{ gap: Spacing.two }}>
                        <ThemedText style={{ color: "white" }} type="subtitle">{movieDetail?.title}</ThemedText>
                        <ThemedText style={{ color: "white" }} type="default">{movieDetail?.year}</ThemedText>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.two, display: "flex" }}>
                            <Ionicons size={16} name="star" color={"yellow"} />
                            <Text style={{ color: "white" }}>{movieDetail?.rating}</Text>
                        </View>
                    </View>
                    <Text style={{ color: "white", lineHeight: 25 }}>{movieDetail?.description}</Text>
                    <View style={{ marginTop: Spacing.five }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginVertical: 15 }}>
                            <Text style={{ color: 'white' }}>CMS</Text>
                            <Text style={{ color: "yellow" }}>See all</Text>
                        </View>
                        <Casts casts={person} />
                        <Button style={{ marginTop: Spacing.four }} text="Watch Trailer" />
                    </View>
                </View>
            </View>

        </ThemedView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // paddingHorizontal: Spacing.four,
        // gap: Spacing.three,
        // paddingBottom: BottomTabInset + Spacing.three,
        // maxWidth: MaxContentWidth,
    },
})

export default MovieDetailScreen