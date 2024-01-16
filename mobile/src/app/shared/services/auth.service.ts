import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, from } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { ChangePassword, Identify, Login, LoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.API;
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }


  public setIsAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  login(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/user/login`, login);
  }

  identify(): Observable<Identify>{
    return this.http.get<Identify>(`${this.API}/user/identify`);
  }

  changePassword(id: number, values: ChangePassword): Observable<ChangePassword> {
    return this.http.patch<ChangePassword>(`${this.API}/user/password/${id}`, values)
  }


}
