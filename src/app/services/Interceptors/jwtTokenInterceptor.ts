import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor{

    constructor (){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { //inject the token if present into each http request
        var token =  localStorage.getItem('Token');
        if(token){
            var WithToken = req.clone({headers: req.headers.set("Authorization","bearer "+token)});

            return next.handle(WithToken);
        }else{
            return next.handle(req)
        }
    }
}
