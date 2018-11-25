import {Component, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {ProjectPage} from '../../shared/project-page';
import {ProjectService} from '../../shared/project.service';
import {ProjectCreation} from '../project-search/project-creation';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SortOrder} from '../../shared/sort-order';
import {OrderBy} from '../../shared/order-by.enum';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({opacity: 0, transform: 'translateY(-15px)'}),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({opacity: 1, transform: 'translateY(0px)'})
              )
            )
          ],
          {optional: true}
        ),
      ])
    ])
  ]
})
export class ProjectListComponent implements OnInit {


  constructor(private projectService: ProjectService, public auth: AuthService, private router: Router) {
  }

  projectPage: ProjectPage;
  public page: number;

  private order: SortOrder;
  private orderBy: OrderBy;
  private filteredQuery: ProjectCreation;

  isDataLoaded = false;

  ngOnInit() {
    this.order = SortOrder.DESC;
    this.orderBy = OrderBy.RATING;
    this.page = 0;
    this.fetchAll(this.page, this.orderBy, this.order);
    if (this.projectPage) {
      this.page = this.projectPage.number;
    }
  }


  fetchAll(page: number, order: OrderBy, sort: SortOrder): void {
    this.projectService.fetchAll(page, order, sort)
      .subscribe(
        data => this.projectPage = data,
        err => console.error(err.message)
      ).add(() => this.isDataLoaded = true);
  }

  nextPage(): void {
    this.fetchAll(++this.projectPage.number, this.orderBy, this.order);
  }

  previousPage(): void {
    this.fetchAll(--this.projectPage.number, this.orderBy, this.order);
  }

  filterByExample(page: number, example: ProjectCreation): void {
    if (this.filteredQuery !== example && example != null) {
      this.filteredQuery = example;
    }

    this.projectService.searchProjects(page, this.orderBy, this.order, example)
      .subscribe(
        data => this.projectPage = data,
        err => console.error(err.message)
      );
  }

  postForm() {
    this.router.navigate(['projects', 'post'])
      .catch((err: Error) => (console.error(err.message)));
  }

  sortByOldest(): void {
    this.order = SortOrder.ASC;
    this.orderBy = OrderBy.DATE;
    this.fetchAll(0, this.orderBy, this.order);
  }

  sortByNewest(): void {
    this.order = SortOrder.DESC;
    this.orderBy = OrderBy.DATE;
    this.fetchAll(0, this.orderBy, this.order);
  }

}
