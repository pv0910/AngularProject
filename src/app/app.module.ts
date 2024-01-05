import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { ReactiveFormsModule} from '@angular/forms';
import { MaterialModule} from 'src/material.module';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { CoursesComponent } from './courses/courses.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { CourseComponent } from './courses/course/course.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { LibraryComponent } from './library/library.component';
import { ContentManagementComponent } from './courses/content-management/content-management.component';
import { EditContentComponent } from './courses/content-management/edit-content/edit-content.component';
import { ViewContentDetailsComponent } from './courses/content-management/view-content-details/view-content-details.component';


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