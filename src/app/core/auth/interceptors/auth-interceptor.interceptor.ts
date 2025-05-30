import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';


export function authInterceptor (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {


  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
}
