import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Renderer2
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AppService } from '../../app.service';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges {
  public data: any = {};
  public displayData: any = {};
  public showFirstInput = false;
  public showLastInput = false;
  public firstNameFormControl = new FormControl('', [Validators.required]);
  public lastNameFormControl = new FormControl('', [Validators.required]);

  constructor(
    private service: AppService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnChanges(change: SimpleChanges) {
    console.log(change);
  }

  ngOnInit() {
    this.route.params.subscribe(item => {
      this.data = { ...this.service.getDataById(item.id) };
      this.formatData();
    });
  }

  private formatData() {
    this.displayData = { ...this.data };
    delete this.displayData.dateOfBirth;
    this.displayData.age = this.service.calculateAge(this.data.dateOfBirth);
  }

  public navigate() {
    if (
      this.displayData.firstName !== this.data.firstName ||
      this.displayData.lastName !== this.data.lastName
    ) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '300px',
        data: {
          alert: 'Please confirm',
          message: `It seems like you have unsaved field.
                    Would you like to save it?`,
          showButtons: true
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result) {
          this.saveData();
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/users']);
        }
      });
    } else {
      this.router.navigate(['/users']);
    }
  }

  public saveData() {
    this.data.firstName = this.displayData.firstName;
    this.data.lastName = this.displayData.lastName;
    this.service.userReducer({ type: 'UPDATE', payload: this.data });
    this.showFirstInput = false;
    this.showLastInput = false;
  }
}
