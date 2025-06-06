import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ProjectLayoutComponent} from "./project-layout/project-layout.component";
import {IsAdminGuard} from "./core/auth/guards/is-admin.guard";
import {FullscreenLayoutComponent} from "./fullscreen-layout/fullscreen-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: ProjectLayoutComponent,
    loadChildren: () => import('./features/dashboard/main-dashboard/main-dashboard.module').then(m => m.MainDashboardModule),
  },
  {
    path: 'users',
    title: 'Users',
    component: ProjectLayoutComponent,
    canMatch: [IsAdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/users/pages/users-list/users.module').then(m => m.UsersModule),
      },
      {
        path: 'createUser',
        title: 'Create User',
        loadChildren: () => import('./features/users/components/create-user/create-user.module').then(m => m.CreateUserModule),
      },
      {
        path: 'updateUser/:idUser',
        title: 'Update User',
        loadChildren: () => import('./features/users/components/update-user/update-user.module').then(m => m.UpdateUserModule),
      },
      {
        path: ':idUser',
        loadChildren: () => import('./features/users/pages/user-details/user-details.module').then(m => m.UserDetailsModule),
      },
    ],
  },
  {
    path: 'customers',
    title: 'Customers',
    component: ProjectLayoutComponent,
    canMatch: [IsAdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/customers/pages/customer-list/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'createCustomer',
        title: 'Create Customer',
        loadChildren: () => import('./features/customers/components/create-customer/create-customer.module').then(m => m.CreateCustomerModule),
      },
      {
        path: 'updateCustomer/:idCustomer',
        title: 'Update Customer',
        loadChildren: () => import('./features/customers/components/update-customer/update-customer.module').then(m => m.UpdateCustomerModule),
      },
      {
        path: ':idCustomer',
        loadChildren: () => import('./features/customers/pages/customer-details/customer-details.module').then(m => m.CustomerDetailsModule),
      },

    ]
  },
  {
    path: 'projects',
    title: 'Projects',
    component: ProjectLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/projects/pages/projects-list/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'createProject',
        canMatch: [IsAdminGuard],
        title: 'Create Project',
        loadChildren: () => import('./features/projects/components/create-project/create-project.module').then(m => m.CreateProjectModule),
      },
      {
        path: 'updateProject/:idProject',
        title: 'Update Project',
        canMatch: [IsAdminGuard],
        loadChildren: () => import('./features/projects/components/update-project/update-project.module').then(m => m.UpdateProjectModule),
      },
      {
        path: ':idProject',
        loadChildren: () => import('./features/projects/pages/project-details/project-details.module').then(m => m.ProjectDetailsModule),
      },

    ]
  },
  {
    path: 'tasks',
    title: 'Tasks',
    component: ProjectLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/tasks/pages/tasks-list/tasks.module').then(m => m.TasksModule),
      },
      {
        path: 'createTask',
        canMatch: [IsAdminGuard],
        title: 'Create Task',
        loadChildren: () => import('./features/tasks/components/create-task/create-task.module').then(m => m.CreateTaskModule),
      },
      {
        path: 'updateTask/:idTask',
        title: 'Update Task',
        loadChildren: () => import('./features/tasks/components/update-task/update-task.module').then(m => m.UpdateTaskModule),
      },
    ]
  },
  {
    path: 'tasks/:idTask',
    component: FullscreenLayoutComponent,
    loadChildren: () => import('./features/tasks/pages/task-details/task-details.module').then(m => m.TaskDetailsModule),
  },
  {
    path: 'notifications',
    title: 'Notifications',
    component: ProjectLayoutComponent,
    loadChildren: () => import('./features/notifications/pages/notifications-list/notifications-list.module').then(m => m.NotificationsListModule),
  },
  {
    path: '',
    component: FullscreenLayoutComponent,
    children: [
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
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
