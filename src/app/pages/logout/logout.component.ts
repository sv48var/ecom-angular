import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app-logout',
  template: `<button (click)="logout()">Logout</button>`,
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private authService:AuthService, private router:Router){}
  
  logout(){
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}