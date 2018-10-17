import { Component, OnChanges, Input,EventEmitter, Output, Inject } from "../../../../node_modules/@angular/core";

import {MatDialog, MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { inject } from "../../../../node_modules/@angular/core/testing";
import {IextendedMovie} from '../../movies/movie';    
import { AppComponent } from "../../app.component";




@Component({
    selector: 'pm-warningDialog',
    templateUrl: './warningDialog.component.html',
    styleUrls: ['./warningDialog.component.css']
})



 export class warningDialogcomponent{  

    @Output() movieDeleted: EventEmitter<string> = new EventEmitter<string>();


     constructor(private Appcomponent: AppComponent,public dialogRef: MatDialogRef<warningDialogcomponent>, @Inject(MAT_DIALOG_DATA) public data :any[]){
     
 }

 Delete(): void{ 
    this.Appcomponent.showInfo();    
    let response= ["Delete"];
    this.dialogRef.close(response);
  }

close(){
     this.dialogRef.close();
}
}