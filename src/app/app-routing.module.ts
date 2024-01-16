import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserlistingComponent } from './components/userlisting/userlisting.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/courses/course/course.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LibraryComponent } from './components/library/library.component';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { ViewContentDetailsComponent } from './components/content-management/view-content-details/view-content-details.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  { path: 'profile', component: ProfileComponent },
  {path:'library',component:LibraryComponent,canActivate:[AuthGuard]},
  {path:'user',component:UserlistingComponent,canActivate:[AuthGuard]},
  {path:'courses',component:CoursesComponent,canActivate:[AuthGuard]},
  {path:'courses',children:[
    {path:'course/:id',component:CourseComponent,canActivate:[AuthGuard]},
    { path: 'course/:id/content', component: ContentManagementComponent,canActivate:[AuthGuard] },
  ]},
  { path: 'content-details/:id', component: ViewContentDetailsComponent },
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
