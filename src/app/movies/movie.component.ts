import { Component, OnChanges, Input,EventEmitter, Output } from "../../../node_modules/@angular/core";
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from "@angular/material";
import {MovieDialogComponent} from '../movies/movieDialog/moviedialog.component';
import {IextendedMovie} from '../movies/movie' 
import { MovieService } from "./movies.service";
import { warningDialogcomponent } from "../shared/warningDialog/warningDialog.component";
import {Imovie} from "./movie"
import {SymbolsRemovePipe} from '../shared/pipes/symbols.remove.pipe';



@Component({
    selector: 'pm-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})


export class MovieComponent implements OnChanges{
@Input() imdbID: string;
@Input() Title: string;
@Input() Year: string;
@Input() Poster: string;
@Input() filteredMovies: Imovie[];


extendedMovie: IextendedMovie;
errorMessage: string;



constructor(private movieService: MovieService,public dialog: MatDialog) {}



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
  dialogConfig.data = [
    this.extendedMovie,
    this.filteredMovies
  ]; 
 break;
 }


    const dialogRef = this.dialog.open(dialog,dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  Search(): void{

      this.movieService.getMovie(this.imdbID).subscribe(
          model =>{
               this.extendedMovie = model;
               this.dialogLogic(MovieDialogComponent);
              },
         error => { this.errorMessage = <any>error}       
      );
  }

  Delete(): void{

    this.movieService.getMovie(this.imdbID).subscribe(
        model =>{
             this.extendedMovie = model;
             this.dialogLogic(warningDialogcomponent);
            },
       error => { this.errorMessage = <any>error}       
    );
}

ngOnChanges(): void{
}
}
