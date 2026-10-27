import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
debugger;
  // Login request par token zaroori nahi hai
  if (token && !req.url.endsWith('/api/auth/login')) {
   
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
return next(authReq);
  }

  return next(req);
};
