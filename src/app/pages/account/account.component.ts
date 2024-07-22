import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.services';

@Component({
  selector: 'my-project-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  selectedOption: string = 'profile';
  userData: any;
  formattedDateOfJoining: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserDetails();
    this.formatDateOfJoining();
  }

  formatDateOfJoining(): void {
    const dateOfJoining = new Date(this.userData.date_joined);
    this.formattedDateOfJoining = dateOfJoining.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  changeOption(option: string): void {
    this.selectedOption = option;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
