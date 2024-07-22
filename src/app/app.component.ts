import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router'
import { AuthService } from './shared/services/auth.services';

@Component({
  selector: 'app-root',
  template: `<my-project-loader *ngIf="loading"></my-project-loader> 
            <my-project-header></my-project-header>
            <router-outlet></router-outlet>
            <my-project-footer></my-project-footer>
             `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  loading: boolean = false;

  constructor(private router:Router, private authService:AuthService){
  this.router.events.subscribe((event)=>{
    if (event instanceof NavigationStart){
      this.loading = true;
    }else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
      this.loading = false;
    }
  });
}
}
