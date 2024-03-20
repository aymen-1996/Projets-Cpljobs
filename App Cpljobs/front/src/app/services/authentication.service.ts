import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from 'src/app/model/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  refreshToken() {
      throw new Error('Method not implemented.');
  }
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')  as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/user/auth`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if(user.token !=null){
          localStorage.setItem('currentUser', JSON.stringify(user));

        this.currentUserSubject.next(user);
        return user;
      }
      return null;
      }));
  }

  logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
