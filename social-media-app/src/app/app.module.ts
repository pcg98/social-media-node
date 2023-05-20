import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SearchUsernameFormComponent } from './navbar-menu/search-username-form/search-username-form.component';
import { ShowUsersSearchComponent } from './show-users-search/show-users-search.component';
import { ShowUserProfileComponent } from './show-user-profile/show-user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    /*
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,*/
    ProfileComponent,
    NavbarMenuComponent,
    RegisterFormComponent,
    SearchUsernameFormComponent,
    ShowUsersSearchComponent,
    ShowUserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

