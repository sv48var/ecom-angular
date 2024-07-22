import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.services';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { throwError } from 'rxjs';

declare const gapi: any;

@Component({
  selector: 'my-project-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  username: string = '';
  password: string = '';
  loginError: string = '';
  loading:boolean = false;

  constructor(
    private authService:AuthService, 
    private router:Router,
    ) {}

  login():void{
    this.loading = true;
    this.authService
    .login(this.username,this.password)
    .pipe(
      catchError((error)=>{
        this.loginError = this.extractErrorMessage(error);
        return throwError(error)
      }),
      finalize(()=>(this.loading = false))
    ).subscribe(
      (response)=>{
        console.log('Login Successful',response);
        this.router.navigate(['/home']);
      }
    );
  }

  private extractErrorMessage(error: any): string{
    if(error.status === 401){
      return 'Invalid email or password. Please try again.'
    }else{
      return 'An error occured. Please try again later.'
    }
  }

}
