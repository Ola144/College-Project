import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ProjectComponent } from './pages/project/project.component';
import { canActivateCollegeProjectGuard, canResolveProjectsGuard, canResolveUsersGuard } from './guards/college-project.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [canActivateCollegeProjectGuard],
        children: [
            {
                path: 'users',
                component: UserListComponent,
                resolve: {users: canResolveUsersGuard}
            },
            {
                path: 'create-user',
                component: CreateUserComponent
            },
            {
                path: 'projects',
                component: ProjectComponent,
                resolve: {projects: canResolveProjectsGuard}
            },
        ]
    }
];
