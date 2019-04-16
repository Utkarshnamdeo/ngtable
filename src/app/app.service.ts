import { Injectable } from '@angular/core';
import * as moment from 'moment';

import data from '../assets/data';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public num = 8;
  private data: Array<User> = [];

  private actions = {
    add: 'ADD',
    remove: 'REMOVE',
    removeMany: 'REMOVE_MANY',
    update: 'UPDATE',
    updateMany: 'UPDATE_MANY'
  };

  constructor() {
    this.data = [...this.fetchUsers()];
  }

  public fetchUsers() {
    return data;
  }

  public getInitialData() {
    // this.data = this.fetchUsers();
    return this.data;
  }

  public getDataById(id) {
    return this.data.find(item => item.id === +id);
  }

  public userReducer(action) {
    switch (action.type) {
      case this.actions.add: {
        return [...this.data, action.payload];
      }
      case this.actions.update: {
        const found = this.data.find(user => {
          return user.id === action.payload.id;
        });
        this.data.splice(this.data.indexOf(found), 1);
        this.data = [...this.data, ...[action.payload]];
        this.data.sort((a, b) => a.id - b.id);
        return this.data;
      }
      case this.actions.updateMany: {
        const key = 'selected';
        this.data.forEach(item => {
          item[key] = action.payload;
        });
        return this.data;
      }
      case this.actions.remove: {
        const index = this.data.indexOf(action.payload);
        this.data.splice(index, 1);
        return this.data;
      }
      case this.actions.removeMany: {
        action.payload.forEach(item => {
          const found = this.data.find(e => e.id === item.id);
          if (found) {
            this.data.splice(this.data.indexOf(found), 1);
          }
        });
        return this.data;
      }
      default: {
        return this.data;
      }
    }
  }

  public calculateAge(age) {
    const dob = moment(new Date(age));
    const now = moment(new Date());
    return dob
      .from(now)
      .split(' ')
      .slice(0, 2)
      .join()
      .replace(',', ' ');
  }
}
