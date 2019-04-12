import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

import { User } from '../../interfaces';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  public age: any;
  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit() {
    let dob = moment(new Date(this.data.dateOfBirth));
    let now = moment(new Date());
    this.age = dob
      .from(now)
      .split(' ')
      .slice(0, 2)
      .join()
      .replace(',', ' ');
  }
}
