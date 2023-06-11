import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { tokenInterceptorProviders } from './helpers/token-expiration.interceptor';

import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SearchUsernameFormComponent } from './navbar-menu/search-username-form/search-username-form.component';
import { ShowUsersSearchComponent } from './show-users-search/show-users-search.component';
import { ShowUserProfileByIdComponent } from './show-user-profile-by-id/show-user-profile-by-id.component';
import { MessagesFormComponent } from './messages-form/messages-form.component';
import { MessagesConversationsComponent } from './messages-conversations/messages-conversations.component';
import { ChatsComponent } from './messages-conversations/chats/chats.component';
import { ShowRequestsComponent } from './show-requests/show-requests.component';

import { FollowComponent } from './follow/follow.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmationModalComponent } from './profile-settings/confirmation-modal/confirmation-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NavbarMenuComponent,
    RegisterFormComponent,
    SearchUsernameFormComponent,
    ShowUsersSearchComponent,
    ShowUserProfileByIdComponent,
    MessagesFormComponent,
    MessagesConversationsComponent,
    ChatsComponent,
    ShowRequestsComponent,
    FollowComponent,
    NotificationsComponent,
    UploadImageComponent,
    ProfileSettingsComponent,
    ShowImageComponent,
    FlashMessageComponent,
    FooterComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders, tokenInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

