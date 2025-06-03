import {CanMatchFn, Route, Router, UrlSegment} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth-service.service";
import {firstValueFrom} from "rxjs";

export const IsAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const result = await firstValueFrom(authService.checkStatus());

  console.log(result);

  if(!result) {
    await router.navigate(['/login']);
    return false;
  }


  return authService.isAdmin();
};
