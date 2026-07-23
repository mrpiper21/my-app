import { ThemedView } from "@/components/themed-view"
import Button from "@/components/ui/Button"
import CustomHeader from "@/components/ui/custom-header"
import Input from "@/components/ui/Input"
import { Spacing } from "@/constants/theme"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { router } from "expo-router"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native"
import CustomToast from "@/components/custom-toast"

const UploadMovieScreen = () => {
    const [posterUrl, setPosterUrl] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [year, setYear] = useState("")
    const [genre, setGenre] = useState("")
    const [rating, setRating] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const canSubmit = posterUrl.trim().length > 0 && title.trim().length > 0

    const handleUpload = async () => {
        if (!canSubmit) return
        setIsLoading(true)
        try {
            // TODO: send { posterUrl, title, description, year, genre, rating } to the movies API once it exists
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setShowToast(true)
            router.back()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ThemedView style={styles.container}>
            <CustomHeader
                title="Upload Movie"
                leftIcon={<Ionicons name="arrow-back" color="white" size={28} onPress={() => router.back()} />}
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.posterPreview}>
                        {posterUrl.trim() ? (
                            <Image source={{ uri: posterUrl.trim() }} style={styles.posterImage} />
                        ) : (
                            <View style={styles.posterPlaceholder}>
                                <Ionicons name="image-outline" color="#ccc" size={36} />
                                <Text style={styles.posterPlaceholderText}>Poster preview</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.formContainer}>
                        <View style={{ marginTop: 0 }}>
                            <Text style={styles.label}>Poster URL</Text>
                            <Input placeholder="https://..." placeholderTextColor="#ccc" value={posterUrl} onChangeText={setPosterUrl} />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.label}>Title</Text>
                            <Input placeholder="Enter movie title" placeholderTextColor="#ccc" value={title} onChangeText={setTitle} />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.label}>Description</Text>
                            <Input
                                placeholder="What's the movie about?"
                                placeholderTextColor="#ccc"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={4}
                            />
                        </View>

                        <View style={{ marginTop: 20, flexDirection: "row", gap: 12 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>Year</Text>
                                <Input type="number" placeholder="2026" placeholderTextColor="#ccc" value={year} onChangeText={setYear} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>Rating</Text>
                                <Input type="number" placeholder="0 - 5" placeholderTextColor="#ccc" value={rating} onChangeText={setRating} />
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.label}>Genre</Text>
                            <Input placeholder="e.g. Action, Drama" placeholderTextColor="#ccc" value={genre} onChangeText={setGenre} />
                        </View>

                        <Button
                            loading={isLoading}
                            onPress={handleUpload}
                            style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
                            text="Upload Movie"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <CustomToast message="Movie uploaded" visible={showToast} onHide={() => setShowToast(false)} />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Spacing.four,
        paddingBottom: Spacing.six,
    },
    posterPreview: {
        alignSelf: "center",
        marginTop: Spacing.four,
        width: 160,
        height: 240,
        borderRadius: Spacing.two,
        overflow: "hidden",
        backgroundColor: "#151A21",
    },
    posterImage: {
        width: "100%",
        height: "100%",
    },
    posterPlaceholder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        borderWidth: 1,
        borderColor: "#595656",
        borderStyle: "dashed",
        borderRadius: Spacing.two,
    },
    posterPlaceholderText: {
        color: "#ccc",
        fontSize: 14,
    },
    formContainer: {
        marginTop: Spacing.five,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    submitButton: {
        marginTop: Spacing.five,
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
})

export default UploadMovieScreen
