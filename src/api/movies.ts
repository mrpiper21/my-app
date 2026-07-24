import { IMovie } from "@/@types/home";
import { db } from "@/config/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

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

export const getMovies = async (userId: string): Promise<(IMovie & { id: string })[]> => {
    const moviesQuery = query(collection(db, "movies"), where("userId", "==", userId))
    const movieQuerySnapShot = await getDocs(moviesQuery)
    return movieQuerySnapShot.docs.map((doc) => {
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