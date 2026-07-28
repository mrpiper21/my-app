import { IMovie } from "@/@types/home";
import { db } from "@/config/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, documentId, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, updateDoc, where } from "firebase/firestore";

export const MOVIES_PAGE_SIZE = 12

export const uploadMovie = async (movie: IMovie) => {
    const movieRef = await addDoc(collection(db, "movies"), {
        title: movie.title,
        description: movie.description,
        rating: movie.rating,
        genre: movie.genre,
        year: movie.year,
        coverImage: movie.posterUrl,
        userId: movie.userId
    })
    return movieRef
}

export type MoviesPage = {
    movies: (IMovie & { id: string })[]
    nextCursor: string | null
}

export const getMovies = async (userId: string, cursor?: string): Promise<MoviesPage> => {
    const constraints: QueryConstraint[] = [
        where("userId", "==", userId),
        orderBy(documentId()),
        limit(MOVIES_PAGE_SIZE),
    ]
    if (cursor) constraints.push(startAfter(cursor))

    const moviesQuery = query(collection(db, "movies"), ...constraints)
    const movieQuerySnapShot = await getDocs(moviesQuery)

    const movies = movieQuerySnapShot.docs.map((doc) => {
        const data = doc.data()
        return {
            id: doc.id,
            title: data.title,
            description: data.description,
            rating: data.rating,
            genre: data.genre,
            year: data.year,
            posterUrl: data.coverImage,
            userId: data.userId,
        }
    })

    const nextCursor = movieQuerySnapShot.docs.length === MOVIES_PAGE_SIZE
        ? movieQuerySnapShot.docs[movieQuerySnapShot.docs.length - 1].id
        : null

    return { movies, nextCursor }
}

export const getMovie = async (movieId: string): Promise<(IMovie & { id: string }) | null> => {
    const movieSnapshot = await getDoc(doc(db, "movies", movieId))
    if (!movieSnapshot.exists()) return null

    const data = movieSnapshot.data()
    return {
        id: movieSnapshot.id,
        title: data.title,
        description: data.description,
        rating: data.rating,
        genre: data.genre,
        year: data.year,
        posterUrl: data.coverImage,
        userId: data.userId,
    }
}

export const deleteMovie = async (movieId: string) => {
    await deleteDoc(doc(db, "movies", movieId))
}

export const updateMovie = async ({ movieId, movie }: { movieId: string, movie: IMovie }) => {
    await updateDoc(doc(db, "movies", movieId), {
        title: movie.title,
        description: movie.description,
        rating: movie.rating,
        genre: movie.genre,
        year: movie.year,
        coverImage: movie.posterUrl,
    })
}