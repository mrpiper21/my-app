import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MovieItem from '@/components/home/movie-item';
import SearchInput from '@/components/home/SearchInput';
import { ThemedView } from '@/components/themed-view';
import CustomHeader from '@/components/ui/custom-header';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useMemo, useState } from 'react';

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
    const [searchText, setSearchText] = useState('')

    const filteredItems = useMemo(() => {
        const query = searchText.trim().toLowerCase()
        if (!query) return MOCK_MOVIES
        return MOCK_MOVIES.filter((movie) => movie.title.toLowerCase().includes(query))
    }, [searchText])

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <CustomHeader title="MovieFlix" leftIcon={<Ionicons name="menu" color="white" size={32} />} rightIcon={<Ionicons name="notifications" color="white" size={32} />} />
                <SearchInput onChangeText={setSearchText} placeholder="Search movies TV shows" />
                <FlatList
                    data={filteredItems}
                    renderItem={({ item }) => (
                        <MovieItem movie={item} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ marginVertical: Spacing.two }}
                    showsVerticalScrollIndicator={false}
                />
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
