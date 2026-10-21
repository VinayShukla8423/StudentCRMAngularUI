import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard';


export const routes: Routes = [
    {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register')
        .then(m => m.Register)
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/main-layout/main-layout')
        .then(m => m.MainLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./features/students/students')
            .then(m => m.Students)
      },
      {
        path: 'teachers',
        loadComponent: () =>
          import('./features/teachers/teachers')
            .then(m => m.Teachers)
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./features/courses/courses')
            .then(m => m.Courses)
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('./features/attendance/attendance')
            .then(m => m.Attendance)
      },
      {
        path: 'exams',
        loadComponent: () =>
          import('./features/exams/exams')
            .then(m => m.Exams)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users')
            .then(m => m.Users)
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./features/roles/roles')
            .then(m => m.Roles)
      },
      {
        path: 'fees',
        loadComponent: () =>
          import('./features/fees/fees')
            .then(m => m.Fees)
      },
      {
        path: 'timetable',
        loadComponent: () =>
          import('./features/timetable/timetable')
            .then(m => m.Timetable)
      },
      {
        path: 'notices',
        loadComponent: () =>
          import('./features/notices/notices')
            .then(m => m.Notices)
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./features/messages/messages')
            .then(m => m.Messages)
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/reports')
            .then(m => m.Reports)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings')
            .then(m => m.Settings)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
