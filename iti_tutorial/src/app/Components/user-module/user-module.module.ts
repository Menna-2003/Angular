import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { UserPeofileComponentComponent } from './user-peofile-component/user-peofile-component.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/User/UserProfile', pathMatch: 'full' },
  { path: 'UserProfile', component: UserPeofileComponentComponent },
  { path: 'EditUserProfile', component: EditUserProfileComponent },
]

@NgModule({
  declarations: [
    EditUserProfileComponent,
    UserPeofileComponentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModuleModule { }
