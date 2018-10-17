import { Component,Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'pm-root',
  template:  `
  <div>
    <h1>{{pageTitle}}</h1>
  <pm-movies></pm-movies>
  </div>
  `
})

@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  pageTitle: string = 'Cinema';
  constructor(private toast: ToastrService) {}


  showError() {
    this.toast.error('Movie already exist','Movie save blocked!');
  }

  showSuccess() {
    this.toast.success('','The Movie was saved');
  }

  showInfo() {
    this.toast.info('','The Movie was Deleted');
  }

}
