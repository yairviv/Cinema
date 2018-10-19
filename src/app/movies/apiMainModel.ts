import { Imovie } from "./movie";


export interface apiMainModel {
    Search: Imovie[];
    totalResults: number;
    Response: boolean;
}