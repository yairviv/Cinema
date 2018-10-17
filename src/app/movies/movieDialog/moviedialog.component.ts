import { Component, OnChanges, Input,EventEmitter, Output, Inject } from "../../../../node_modules/@angular/core";

import {MatDialog, MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { apiMainModel } from "../apiMainModel";
import { inject } from "../../../../node_modules/@angular/core/testing";
import {IextendedMovie} from '../movie';  
import { MovieService } from "../movies.service";
import { AppComponent } from "../../app.component";




@Component({
    selector: 'pm-movieDialog',
    templateUrl: './moviedialog.component.html',
    styleUrls: ['./moviedialog.component.css']
})



 export class MovieDialogComponent{  

    iextendedmovie: IextendedMovie;
    isNewMovie:boolean;

     constructor(private movieService: MovieService, private Appcomponent: AppComponent, public dialogRef: MatDialogRef<MovieDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any){

     this.iextendedmovie = data;  
     if(!this.iextendedmovie.Title)
     {
         this.isNewMovie = true;       
     }   
 }


 Save(): void{
     if(this.isNewMovie)
     {
        this.movieService.getMovieByName(this.iextendedmovie.Title).subscribe(
            model =>{
                if(!model.Title)
                {
                this.Appcomponent.showSuccess();    
                let response= ["Add",this.iextendedmovie];

                this.dialogRef.close(response);                                   
                }
                else
                {
                    this.Appcomponent.showError();
                }  
                },
        );

     }
     else
     {
        this.dialogRef.close();
     }
}

close(){
     this.dialogRef.close();
}

}