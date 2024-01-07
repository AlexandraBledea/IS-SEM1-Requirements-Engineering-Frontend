import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginData } from '../data-types/UserLoginData';
import { UserRegisterData } from '../data-types/UserRegisterData';

const URL_BASE = 'http://localhost:8090/login';
const LOGIN = URL_BASE + '/auth';
const REGISTER = 'http://localhost:8090/user/add-user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public login(loginData: UserLoginData): Observable<any> {
    return this.httpClient.post<any>(LOGIN, loginData);
  }

  public register(registerData: UserRegisterData): Observable<any> {
    return this.httpClient.post(REGISTER, registerData, {
      responseType: 'text',
    });
  }
}
