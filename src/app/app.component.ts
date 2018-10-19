import { Component,Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'pm-root',
  template:  `
  <div>
  <div class="jumbotron jumbotron-fluid">
  <div class="container" style="margin-left: 30px">
  <img src="./assets/images/favicon-96x96.jpg">
    <h1 class="display-3" >{{pageTitle}} </h1>
    <p class="lead">Movies inventory search engine and modifier.</p>
  </div>
</div>
  <pm-movies></pm-movies>
  </div>
  `
})


@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  pageTitle: string = 'Herolo Cinema';
  constructor(private toast: ToastrService) {}


  

  showError() {
    this.toast.error('Movie already exist','Movie save blocked!');
  }

  showSuccess() {
    this.toast.success('','The Movie was saved');
  }

  showInfo(text: string) {
    this.toast.info('',text);
  }

}
