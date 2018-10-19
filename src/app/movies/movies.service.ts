import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {IextendedMovie} from '../movies/movie' 


import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { Imovie } from './movie';
import { apiMainModel } from './apiMainModel';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient) { }

  getMovies(Filters:  Map<string,string> ): Observable<apiMainModel> {
    
   var moviesUrl = 'http://www.omdbapi.com/?apikey=c31e96f3';

    for (var key of Filters.keys()) {
      if(Filters.get(key) != ''){
        moviesUrl += '&' + key + Filters.get(key);
    }
    
    } 
    
      return this.http.get<apiMainModel>(moviesUrl);  
  }    

  getMovie(id: string): Observable<IextendedMovie> {
    var movieUrl = 'http://www.omdbapi.com/?apikey=c31e96f3&i=';
    movieUrl += id;
    return this.http.get<IextendedMovie>(movieUrl).pipe(
      tap(data => JSON.stringify(data)),
    );
  }

  
  getMovieByName(name: string): Observable<IextendedMovie> {
    var movieUrl = 'http://www.omdbapi.com/?apikey=c31e96f3&t=';
    movieUrl += name;

    return this.http.get<IextendedMovie>(movieUrl).pipe(
      tap(data => JSON.stringify(data)),
    );

  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}