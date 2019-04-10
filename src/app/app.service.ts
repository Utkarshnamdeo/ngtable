import { Injectable } from '@angular/core';

import data from '../assets/data';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public num = 8;
  private data: Array<User> = [];

  private actions = {
    addUser: 'ADD_USER',
    removeUser: 'REMOVE_USER',
    updateUser: 'UPDATE_USER'
  };

  constructor() {}

  public fetchUsers() {
    return data;
  }

  public getInitialData() {
    this.data = this.fetchUsers();
    return this.data;
  }

  public userReducer(action) {
    switch (action.type) {
      case this.actions.addUser: {
        return [...this.data, action.payload];
      }
      case this.actions.updateUser: {
        let found = this.data.find(user => {
          return user.id === action.payload.id;
        });

        return this.data;
      }
      case this.actions.removeUser: {
        return [
          ...this.data.slice(0, action.payload.index),
          ...this.data.slice(action.payload.index + 1)
        ];
      }
      default: {
        return this.data;
      }
    }
  }

  updateNum(num) {
    this.num = num;
    return this.num;
  }

  getNum() {
    return this.num;
  }
}
