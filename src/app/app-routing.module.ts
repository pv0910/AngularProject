import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './courses/course/course.component';
import { AuthGuard } from '../guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { LibraryComponent } from './library/library.component';
import { ContentManagementComponent } from './courses/content-management/content-management.component';
import { ViewContentDetailsComponent } from './courses/content-management/view-content-details/view-content-details.component';
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
