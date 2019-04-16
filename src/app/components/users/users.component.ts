import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AppService } from '../../app.service';
import { User } from '../../interfaces';
import { UserModalComponent } from '../../shared/user-modal/user-modal.component';
import { UsersService } from './users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {
  public localData: Array<User> = [];
  public tableHeads = [];
  public showExport = false;
  public selectedItems: Array<User> = [];
  public isSelected = false;
  /* pagination options and  */
  public displayData: Array<User> = [];
  public currentPage = 0;
  private lastPage = 0;
  public totalPages = 0;
  public paginationButtons = {
    first: {
      title: 'First',
      value: 0,
      disabled: false
    },
    prev: {
      title: 'Previous',
      value: 0,
      disabled: false
    },
    next: {
      title: 'next',
      value: 0,
      disabled: false
    },
    last: {
      title: 'last',
      value: 0,
      disabled: false
    }
  };

  /* export options */
  private exportOptions = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: true,
    title: 'asfasf',
    useBom: false,
    removeNewLines: true,
    keys: []
  };

  public fileName = '';

  constructor(
    private appService: AppService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.localData = this.appService.getInitialData();
    this.calculateDisplayData();
    this.tableHeads = Object.keys(this.localData[0]);
    this.exportOptions.keys = [...this.tableHeads];
  }

  public navigateToDetail(data: User) {
    this.router.navigate(['/users', data.id]);
  }

  public openModal(e, data) {
    e.stopPropagation();
    // e.preventDefault();
    this.dialog.open(UserModalComponent, { data });
  }

  private calculateDisplayData(selected?) {
    const page = this.calculatePagination(selected);
    this.displayData = [...this.localData.slice(page * 10, (page + 1) * 10)];
  }

  private calculatePagination(selected?) {
    this.lastPage = Math.round(this.localData.length / 10) - 1;
    this.totalPages = this.lastPage;
    this.currentPage =
      selected !== undefined
        ? selected
        : this.currentPage > this.lastPage
        ? this.lastPage
        : this.currentPage;
    this.paginationButtons.next.value =
      this.lastPage === this.currentPage
        ? this.currentPage
        : this.currentPage + 1;
    this.paginationButtons.prev.value =
      this.paginationButtons.first.value === this.currentPage
        ? this.currentPage
        : this.currentPage - 1;
    this.paginationButtons.last.value = this.lastPage;

    if (this.currentPage === this.paginationButtons.first.value) {
      this.paginationButtons.first.disabled = true;
      this.paginationButtons.prev.disabled = true;
    } else {
      this.paginationButtons.first.disabled = false;
      this.paginationButtons.prev.disabled = false;
    }

    if (this.currentPage === this.lastPage) {
      this.paginationButtons.last.disabled = true;
      this.paginationButtons.next.disabled = true;
    } else {
      this.paginationButtons.last.disabled = false;
      this.paginationButtons.next.disabled = false;
    }

    return this.currentPage;
  }

  public paginate(value) {
    this.calculateDisplayData(value);
  }

  public selectAll(e) {
    this.selectedItems = [];
    this.localData = [
      ...this.appService.userReducer({
        type: 'UPDATE_MANY',
        payload: e.checked
      })
    ];
    this.updateData();
  }

  public deleteSelected(e) {
    e.stopPropagation();
    this.localData = [
      ...this.appService.userReducer({
        type: 'REMOVE_MANY',
        payload: this.selectedItems
      })
    ];
    this.isSelected = false;
    this.updateData();
  }

  updateData() {
    this.selectedItems = this.localData.filter(item => item.selected === true);
    return this.calculateDisplayData();
  }

  /* handle event from the user-item component  */
  public userEventHandler(event) {
    this.localData = [...this.appService.userReducer(event)];
    this.updateData();
  }

  public export(e) {
    e.stopPropagation();
    this.userService.export(this.selectedItems, this.tableHeads, this.fileName);
    this.fileName = '';
    this.showExport = false;
  }
}
