import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthGuard } from './guards/auth.guard.ts.service';
import { ShowUsersSearchComponent } from './show-users-search/show-users-search.component';
import { ShowUserProfileByIdComponent } from './show-user-profile-by-id/show-user-profile-by-id.component';
import { MessagesConversationsComponent } from './messages-conversations/messages-conversations.component';
import { ChatsComponent } from './messages-conversations/chats/chats.component';
import { ShowRequestsComponent } from './show-requests/show-requests.component';
import { FollowComponent } from './follow/follow.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ShowImageComponent } from './show-image/show-image.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterFormComponent},
  
  //AuthGuard check that we are login with the backend
  { path: 'users/search/:nickname', component: ShowUsersSearchComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users/profile/:targetid', component: ShowUserProfileByIdComponent, canActivate: [AuthGuard] },
  { path: 'profile/settings', component: ProfileSettingsComponent, canActivate: [AuthGuard] },

  { path: 'chats', component: MessagesConversationsComponent, canActivate: [AuthGuard] },
  { path: 'chats/:id', component: ChatsComponent, canActivate: [AuthGuard] },

  { path: 'followers', component: FollowComponent, canActivate: [AuthGuard] },
  { path: 'following', component: FollowComponent, canActivate: [AuthGuard] },

  { path: 'followers/requests', component: ShowRequestsComponent, canActivate: [AuthGuard] },

  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },

  { path: 'images/upload', component: UploadImageComponent, canActivate: [AuthGuard] },
  { path: 'images/show/:id', component: ShowImageComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
