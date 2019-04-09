import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
@NgModule({
  declarations: [UserComponent, UserListComponent, UserDetailComponent],
  imports: [CommonModule, UserRoutingModule],
  exports: [UserComponent, UserListComponent, UserDetailComponent],
  providers: [UserService]
})
export class UserModule {}
