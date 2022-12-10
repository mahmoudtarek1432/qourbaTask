import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

 /* Login(login:LoginAccount):Observable<ServerResponseDto<string>>{
    return this.http.post<ServerResponseDto<string>>(this.globals.baseUrl+"/WebApp/login",login,{headers: this.globals.headers,withCredentials: false})
  }*/

  CheckAuth():Observable<string>{
    return this.http.get<string>('https://dummyjson.com/carts',{
      headers: {
      'Content-Type': 'application/json'
    },withCredentials: false})
  }

  login(body:any):Observable<string>{
    return this.http.post<string>('https://dummyjson.com/auth/login',body)
  }
}
