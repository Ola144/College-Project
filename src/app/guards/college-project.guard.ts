import { inject } from '@angular/core';
import { CanActivateFn, ResolveFn, Router } from '@angular/router';
import { MasterService } from '../service/master.service';

export const canActivateCollegeProjectGuard: CanActivateFn = (route, state) => {
  const masterService = inject(MasterService);
  const router = inject(Router);

  if (masterService.isLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

export const canResolveProjectsGuard: ResolveFn<any> = () => {
  const masterService = inject(MasterService);

  return masterService.getAllProjects();
}

export const canResolveUsersGuard: ResolveFn<any> = () => {
  const masterService = inject(MasterService);

  return masterService.getAllUsers();
}
