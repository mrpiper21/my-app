export interface IMovie {
    id: number;
    title: string;
    posterUrl: string;
    rating: number;
}

export interface IMovieList {
    movies: IMovie[]
}