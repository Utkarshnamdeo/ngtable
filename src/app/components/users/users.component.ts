import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AppService } from '../../app.service';
import { User } from '../../interfaces';
import { UserModalComponent } from '../../shared/user-modal/user-modal.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public localData: Array<User> = [];
  public tableHeads = [];

  constructor(
    private service: AppService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public navigateToDetail(data: User) {
    this.router.navigate(['/users', data.id]);
  }

  public openModal(data) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '300px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  ngOnInit() {
    this.localData = this.service.getInitialData();
    this.tableHeads = Object.keys(this.localData[0]);
  }
}
