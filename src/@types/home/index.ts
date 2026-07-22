export interface IMovie {
    id: number;
    title: string;
    posterUrl: string;
    rating: number;
    description?: string
    year?: string
}

export interface IMovieList {
    movies: IMovie[]
}