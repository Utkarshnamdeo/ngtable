import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../interfaces';
@Component({
  selector: 'tr[app-user-item]',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() itemData: User;
  @Output() userEvent: EventEmitter<any> = new EventEmitter<any>();

  public displayData: any = {};
  constructor(private router: Router) {}

  ngOnInit() {
    this.displayData = { ...this.itemData };
    delete this.displayData.selected;
  }

  public navigateToDetail() {
    this.router.navigate(['/users', this.itemData.id]);
  }

  public delete(e) {
    e.stopPropagation();
    this.userEvent.emit({ type: 'REMOVE', payload: this.itemData });
  }

  public select(e) {
    this.itemData = { ...this.itemData, ...{ selected: e.checked } };
    this.userEvent.emit({
      type: 'UPDATE',
      payload: this.itemData
    });
  }
}
