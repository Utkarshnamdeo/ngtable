import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';

@NgModule({
  declarations: [UserComponent, UserDetailComponent, UserModalComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
