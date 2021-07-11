import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { WebsiteLayoutComponent } from './layouts/website-layout/website-layout.component';




const routes: Routes =[
  //{path:'web', component: WebsiteLayoutComponent},
  
   {path:'',component: LoginComponent},
  //{path:'',component: ServicesTpyeListComponent},
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: 'admin', 
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, 

  {
    path: 'web',
    component: WebsiteLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/website-layout/website-layout.module#WebsiteLayoutModule'
      }
    ]
  },

  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
