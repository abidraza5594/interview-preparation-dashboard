import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CategoryComponent } from './layout/category/category.component';
import { FrontEndComponent } from './post/all-post/frontend.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { SignupComponent } from './layout/signup/signup.component';
import { AuthGuard } from './Services/auth.guard';
import { BackendComponent } from './post/all-post/backend/backend.component';
import { NormalPostsComponent } from './post/all-post/normal-posts/normal-posts.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'catogery',component:CategoryComponent,canActivate:[AuthGuard]},
  {path:'frontend',component:FrontEndComponent,canActivate:[AuthGuard]},
  {path:'backend',component:BackendComponent,canActivate:[AuthGuard]},
  {path:'normal-post',component:NormalPostsComponent,canActivate:[AuthGuard]},

  {path:'posts/new',component:NewPostComponent,canActivate:[AuthGuard]},
  {path:'login',component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
