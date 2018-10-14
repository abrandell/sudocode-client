import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {UserPage} from '../../shared/user-page';
import {SortOrder} from '../../shared/sort-order';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  protected users: UserPage;
  private pageNum: number;
  private order: SortOrder;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.order = SortOrder.DESC;
    this.pageNum = 0;

    this.fetchAll(this.pageNum, this.order);

    if (this.users) {
      this.pageNum = this.users.number;
    }
  }

  fetchAll(page: number, order: SortOrder): void {
    this.userService.fetchAll(page, order)
      .subscribe(
        data => this.users = data,
        err => console.log(err)
      );

  }

}
