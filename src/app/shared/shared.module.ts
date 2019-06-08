import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [UserModalComponent, ConfirmModalComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [UserModalComponent, ConfirmModalComponent]
})
export class SharedModule {}
