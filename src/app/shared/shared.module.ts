import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [UserModalComponent, ConfirmModalComponent],
  imports: [CommonModule],
  exports: [UserModalComponent, ConfirmModalComponent]
})
export class SharedModule {}
