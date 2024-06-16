import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(public userServ: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):any {

    ('your req on its way!!');

    var userToken = this.userServ.getMyToken();

    const tokenizedReq = req.clone({
      setHeaders: {
        'myauthtoken': userToken ? userToken : ''
            }
    })

    return next.handle(tokenizedReq);
    
  }
}
