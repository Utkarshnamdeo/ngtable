import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public num = 0;

  constructor(private service: AppService, private router: Router) {}
  updateNum() {
    this.num = this.service.updateNum(8);
  }
  navigate() {
    this.router.navigate(['/users']);
  }
  ngOnInit() {
    this.num = this.service.getNum();
  }
}
