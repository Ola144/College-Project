import { HttpInterceptorFn } from '@angular/common/http';

export const collegeProjectInterceptor: HttpInterceptorFn = (req, next) => {
  // try {
  const localData = localStorage.getItem('collegeProject');
  if (localData != null) {
    const tokenData = JSON.parse(localData);
    const token = tokenData.refreshToken;
    const newReqData = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next(newReqData);
  } else {
    return next(req);
  }
  // } catch(err){}


};
