import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/User/UserProfile', pathMatch: 'full' },
  { path: 'UserProfile', component: UserProfileComponent },
  { path: 'EditUserProfile', component: EditUserProfileComponent },
]

@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileComponent,
    EditUserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
