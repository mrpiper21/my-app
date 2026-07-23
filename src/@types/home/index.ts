export interface IMovie {
    id?: string;
    title: string;
    posterUrl: string;
    rating: number;
    description?: string
    year?: string;
    genre?: string;
    userId?: string
}

export interface IMovieList {
    movies: IMovie[]
}