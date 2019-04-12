import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../interfaces';
import { AppService } from '../../../app.service';
@Component({
  selector: 'tr[app-user-item]',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() itemData: Array<User>;
  @Input() columnWidth: number;
  @Output() userEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private router: Router, service: AppService) {}

  ngOnInit() {}

  public navigateToDetail(data) {
    this.router.navigate(['/users', data.id]);
  }

  public delete(event, data) {
    event.stopPropagation();
    this.userEvent.emit({ type: 'REMOVE_USER', payload: data });
  }

  select(e) {
    e.stopPropagation();
  }
}
