import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MovieItem from '@/components/home/movie-item';
import SearchInput from '@/components/home/SearchInput';
import { ThemedView } from '@/components/themed-view';
import CustomHeader from '@/components/ui/custom-header';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useGetMovies } from '@/hooks/movie-hook';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';

const GRID_COLUMNS = 3
const GRID_GAP = Spacing.three

export default function HomeScreen() {
    const [searchText, setSearchText] = useState('')
    const { width: windowWidth } = useWindowDimensions()

    const { data } = useGetMovies()

    const movies = data ?? []

    const filteredItems = useMemo(() => {
        const query = searchText.trim().toLowerCase()
        if (!query) return movies
        return movies.filter((movie) => movie.title.toLowerCase().includes(query))
    }, [searchText, movies])

    const itemWidth = useMemo(() => {
        const containerWidth = Math.min(windowWidth, MaxContentWidth) - Spacing.four * 2
        return (containerWidth - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS
    }, [windowWidth])

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <CustomHeader title="MovieFlix" leftIcon={<Ionicons name="menu" color="white" size={32} />} rightIcon={<Ionicons name="notifications" color="white" size={32} />} />
                <SearchInput onChangeText={setSearchText} placeholder="Search movies TV shows" />
                <FlatList
                    data={filteredItems}
                    renderItem={({ item }) => (
                        <MovieItem movie={item} width={itemWidth} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={GRID_COLUMNS}
                    columnWrapperStyle={{ gap: GRID_GAP }}
                    contentContainerStyle={{ gap: GRID_GAP, paddingVertical: Spacing.two }}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity onPress={() => router.push("/upload-movie")} activeOpacity={0.7}>
                    <Ionicons style={{ position: "absolute", bottom: -50, right: 5 }} size={64} color={"white"} name='add-circle' />
                </TouchableOpacity>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex'
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
