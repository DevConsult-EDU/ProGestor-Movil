import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ProjectLayoutComponent} from "./project-layout/project-layout.component";
import {IsAdminGuard} from "./core/auth/guards/is-admin.guard";

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
    path: '',
    component: ProjectLayoutComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadChildren: () => import('./features/dashboard/main-dashboard/main-dashboard.module').then(m => m.MainDashboardModule),
      },
      {
        path: 'users',
        title: 'Users',
        canMatch: [IsAdminGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./features/users/components/users-list/users.module').then(m => m.UsersModule),
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
            loadChildren: () => import('./features/users/components/user-details/user-details.module').then(m => m.UserDetailsModule),
          },

        ],

      },
      {
        path: 'customers',
        title: 'Customers',
        canMatch: [IsAdminGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./features/customers/components/customer-list/customer.module').then(m => m.CustomerModule),
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
            loadChildren: () => import('./features/customers/components/customer-details/customer-details.module').then(m => m.CustomerDetailsModule),
          },

        ]
      },
      {
        path: 'projects',
        title: 'Projects',
        children: [
          {
            path: '',
            loadChildren: () => import('./features/projects/components/projects-list/projects.module').then(m => m.ProjectsModule),
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
            loadChildren: () => import('./features/projects/components/project-details/project-details.module').then(m => m.ProjectDetailsModule),
          },

        ]
      },
      {
        path: 'tasks',
        title: 'Tasks',
        children: [
          {
            path: '',
            loadChildren: () => import('./features/tasks/components/tasks-list/tasks.module').then(m => m.TasksModule),
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
          {
            path: ':idTask',
            loadChildren: () => import('./features/tasks/components/task-details/task-details.module').then(m => m.TaskDetailsModule),
          },

        ]
      },
      {
        path: 'attachments',
        title: 'Attachments',
        children: [
          {
            path: '',
            loadChildren: () => import('./features/tasks/attachments/components/attachments-list/attachments-list.module').then(m => m.AttachmentsListModule),
          },
        ]
      },
      {
        path: 'notifications',
        title: 'Notifications',
        loadChildren: () => import('./features/notifications/components/notifications-list/notifications-list.module').then(m => m.NotificationsListModule),
      }
    ]
  },
  {
    path: 'register',
    title: 'Register',
    loadChildren: () => import('./features/auth/pages/register-page/register-page.module').then(m => m.RegisterPageModule),
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
