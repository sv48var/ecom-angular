import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.services';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'my-project-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string='';
  email: string='';
  password: string='';
  showPassword: boolean = false;
  signupError: string = '';
  loading: boolean = false;

  constructor(private authservice:AuthService, private router:Router){}

  signUp(): void{
    this.loading = true;
    this.authservice
    .signup(this.username,this.email,this.password)
    .pipe(
      catchError((error)=>{
        this.signupError = this.extractErrorMessage(error);
        return throwError(error);
      }),
      finalize(()=>(this.loading = false))
      ).subscribe(
        (response)=>{
          this.router.navigate(['/login']);
        }
      )
      }

      private extractErrorMessage(error: any): string {
        if (error.status === 400 && error.error && error.error.username) {
          return error.error.username[0];
        } else if (error.status === 401) {
          return 'This email is already registered. Please use a different email.';
        } else {
          return 'An error occurred. Please try again later.';
        }
      }
      
}
