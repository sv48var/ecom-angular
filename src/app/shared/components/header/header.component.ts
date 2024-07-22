import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'my-project-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username: string | null;

  constructor(private authService: AuthService, private router: Router) {
    const userDetails = authService.getUserDetails();
    this.username = userDetails ? userDetails.username : null;
  }
}
