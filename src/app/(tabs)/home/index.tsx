import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { Image } from 'expo-image';

const MOCK_MOVIES = [
    {
        id: 1,
        title: 'Movie 1',
        posterUrl: 'https://picsum.photos/seed/movie1/150/225',
        rating: 4.5,
    },
    {
        id: 2,
        title: 'Movie 2',
        posterUrl: 'https://picsum.photos/seed/movie2/150/225',
        rating: 3.8,
    },
    {
        id: 3,
        title: 'Movie 3',
        posterUrl: 'https://picsum.photos/seed/movie3/150/225',
        rating: 4.2,
    },
    {
        id: 4,
        title: 'Movie 4',
        posterUrl: 'https://picsum.photos/seed/movie4/150/225',
        rating: 4.0,
    },
];

export default function HomeScreen() {
    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header Section */}
                <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Ionicons name="menu" color="white" size={32} />
                    <ThemedText>MoviewFlix</ThemedText>
                    <Ionicons name="notifications" color="white" size={32} />
                </ThemedView>
                {/* Search Section */}
                <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.two, backgroundColor: Colors.light.card, padding: Spacing.two, borderRadius: Spacing.two }}>
                    <Ionicons color={Colors.light.textSecondary} name="search" size={24} />
                    <TextInput placeholder="Search movies TV shows" style={{ flex: 1 }} />
                </ThemedView>

                <ThemedView>
                    <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <ThemedText style={{ color: "white" }}>Now Playing</ThemedText>
                        <ThemedText style={{ color: "#F5C451" }}>See all</ThemedText>
                    </ThemedView>
                    {/**Movie grid */}
                    <ThemedView style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2, marginVertical: Spacing.two }}>
                        {MOCK_MOVIES.map((movie) => (
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
                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        gap: Spacing.three,
        paddingBottom: BottomTabInset + Spacing.three,
        maxWidth: MaxContentWidth,
    },
    heroSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: Spacing.four,
        gap: Spacing.four,
    },
    title: {
        textAlign: 'center',
    },
    code: {
        textTransform: 'uppercase',
    },
    stepContainer: {
        gap: Spacing.three,
        alignSelf: 'stretch',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.four,
        borderRadius: Spacing.four,
    },
});
