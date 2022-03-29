import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = this.authenticationService.getLoggedUser();
        if (user && user.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
        }

        return next.handle(request);
    }
}