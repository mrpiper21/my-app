import { IMovie } from "@/@types/home";
import { db } from "@/config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const uploadMovie = async (movie: IMovie) => {
    const movieRef = await addDoc(collection(db, "movies"), {
        title: movie.title,
        description: movie.description,
        rating: movie.rating,
        genre: movie.genre,
        year: movie.year,
        coverImage: movie.posterUrl
    })
    console.log("movie ref-----> ", movieRef)
    return movieRef
}