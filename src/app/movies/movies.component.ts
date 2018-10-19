import { Component, OnInit, Output, OnChanges } from "../../../node_modules/@angular/core";
import { error } from "util";
import { Imovie, IextendedMovie } from "./movie";
import { MovieService } from "./movies.service";
import { apiMainModel } from "./apiMainModel";
import { StringifyOptions } from "querystring";
import {MovieDialogComponent} from '../movies/movieDialog/moviedialog.component';
import {warningDialogcomponent} from '../shared/warningDialog/warningDialog.component'



import {MatDialog, MatDialogConfig} from "@angular/material";
import { promise } from "../../../node_modules/protractor";
import { AppComponent } from "../app.component";


@Component({
    selector: 'pm-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css'],
})

export class MoviesComponent implements OnInit, OnChanges {
    pageTitle: string = 'Herolo Cinema';
    errorMessage: string;

    filteredMovies: Imovie[];
    Movies: Imovie[];
    mainModel: apiMainModel;
    MovieNameFilter: string = '';
    MovieYearFilter: string = '';
    extendedMovie: IextendedMovie;


constructor(private movieService: MovieService ,public dialog: MatDialog, private Appcomponent: AppComponent){
  
}


onmovieDeleted(message: string): void {
    this.pageTitle + message;
   }

SearchMovies():void{

  var  Filters = new Map();
  this.MovieNameFilter!='' ? Filters.set('s=',this.MovieNameFilter) : Filters.delete('s=');
  this.MovieYearFilter!='' ? Filters.set('y=',this.MovieYearFilter) : Filters.delete('y=');
 

    this.movieService.getMovies(Filters).subscribe(
        model =>{
             this.mainModel = model;
             this.filteredMovies=this.mainModel.Search;   
            },
       error => { this.errorMessage = <any>error}       
    );
}


DeleteMovie(id: string): void{
    let promise = new Promise((resolve, reject) => {

        if (this.UpdateMoviesArray(id)) {
          resolve('Success!');
        } else {
          reject('Oops... something went wrong');
        }
      });
      
      promise.then(data => {
        console.log(data);
      });
}

UpdateMoviesArray(id: string): boolean{

    this.filteredMovies =  this.filteredMovies.filter(m => m.imdbID != id);
    return true;
}

ngOnInit(): void{
}

   ngOnChanges():void{      
    
   }

   SearchMovie(movie: Imovie): void{

    this.movieService.getMovie(movie.imdbID).subscribe(
        model =>{
             this.extendedMovie = model;
             this.dialogLogic(MovieDialogComponent);
            },
       error => { this.errorMessage = <any>error}       
    );
}


AddMovie(movie: Imovie): void{

    this.extendedMovie = new IextendedMovie();

    this.dialogLogic(MovieDialogComponent);

}

AddMovieToArray(movie: Imovie): void{

this.filteredMovies.push(movie);

}

Delete(movie: Imovie): void{

    this.movieService.getMovie(movie.imdbID).subscribe(
        model =>{
             this.extendedMovie = model;
             this.dialogLogic(warningDialogcomponent);
            },
       error => { this.errorMessage = <any>error}       
    );
}
   
    dialogLogic(dialog: any):void{

    let dialogConfig  = new MatDialogConfig();
 
 switch (dialog){
 
   case MovieDialogComponent:
   dialogConfig.width = '500px';
   dialogConfig.height = '400px';
   dialogConfig.autoFocus = true;
   dialogConfig.disableClose = true;
   dialogConfig.data = this.extendedMovie;
 break;
   case warningDialogcomponent:
   dialogConfig.width = '400px';
   dialogConfig.height = '150px';
   dialogConfig.autoFocus = true;
   dialogConfig.disableClose = true;
   dialogConfig.data = this.extendedMovie;
   
 break;
 }
 
 
     const dialogRef = this.dialog.open(dialog,dialogConfig)
 
     dialogRef.afterClosed().subscribe(result => {
        switch (result[0]){

            case "Delete":
            this.DeleteMovie(this.extendedMovie.imdbID);
            break;
            case "Add":
            let IextendedMovie = result[1];
            let newMovie = new Imovie();

            newMovie.Title =IextendedMovie.Title;
            newMovie.imdbID = IextendedMovie.imdbID;
            newMovie.Poster = "";
            newMovie.Type=IextendedMovie.Type;
            newMovie.Year = IextendedMovie.Year;

            
            this.movieService.getMovieByName(newMovie.Title).subscribe(
                model =>{
                    if(!model.Title)
                    {
                      this.AddMovieToArray(newMovie);                    
                    }
                    else
                    {
                        this.Appcomponent.showError();
                    }  
                    },
               error => { this.errorMessage = <any>error}       
            );
                                  
               break;
        }
     });
   }

}