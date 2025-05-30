import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'Login',
    loadChildren: () => import('./features/auth/pages/login-page/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    title: 'Register',
    loadChildren: () => import('./features/auth/pages/register-page/register-page.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadChildren: () => import('./features/dashboard/main-dashboard/main-dashboard.module').then(m => m.MainDashboardModule),
  },
  {
    path: 'users',
    title: 'Users',
    loadChildren: () => import('./features/users/components/users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'customers',
    title: 'Customers',
    loadChildren: () => import('./features/customers/components/customer-list/customer.module').then(m => m.CustomerModule),
  },
  {
    path: 'projects',
    title: 'Projects',
    loadChildren: () => import('./features/projects/components/projects-list/projects.module').then(m => m.ProjectsModule),
  },
  {
    path: 'tasks',
    title: 'Tasks',
    loadChildren: () => import('./features/tasks/components/tasks-list/tasks.module').then(m => m.TasksModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
