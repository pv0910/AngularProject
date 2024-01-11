import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserlistingComponent } from './components/userlisting/userlisting.component';
import { ReactiveFormsModule} from '@angular/forms';
import { MaterialModule} from 'src/material.module';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UpdatepopupComponent } from './components/updatepopup/updatepopup.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SearchComponent } from './components/search/search.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { CourseComponent } from './components/courses/course/course.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { LibraryComponent } from './components/library/library.component';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { EditContentComponent } from './components/content-management/edit-content/edit-content.component';
import { ViewContentDetailsComponent } from './components/content-management/view-content-details/view-content-details.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserlistingComponent,
    UpdatepopupComponent,
    CoursesComponent,
    SearchComponent,
    FilterComponent,
    CourseComponent,
    ProfileComponent,
    AddCourseComponent,
    LibraryComponent,
    ContentManagementComponent,
    EditContentComponent,
    ViewContentDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }