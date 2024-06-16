import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  registerForm(regData: any){
     (regData);
     return this.http.post<string>('http://localhost:3000/register', regData) 
  }

  loginForm(loginData: any){
       (loginData);
       return this.http.post<string>('http://localhost:3000/login', loginData)
  }

  isLoggedUser() {
    return !!localStorage.getItem('loggedUser');
  }

  getMyToken(){
    return localStorage.getItem('loggedUser');
  }
}
