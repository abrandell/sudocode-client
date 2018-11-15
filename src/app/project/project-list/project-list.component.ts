import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {ProjectPage} from '../../shared/project-page';
import {ProjectService} from '../../shared/project.service';
import {ProjectCreation} from '../project-search/project-creation';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {SortOrder} from '../../shared/sort-order';

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


  constructor(private projectService: ProjectService, protected auth: AuthService, private router: Router) {
  }

  projectPage: ProjectPage;
  public page: number;
  orderBy: string;

  private order: SortOrder;
  private filteredQuery: ProjectCreation;

  ngOnInit() {
    this.order = SortOrder.DESC;
    this.page = 0;
    this.fetchAll(this.page, this.order);
    if (this.projectPage) {
      this.page = this.projectPage.number;
    }
  }

  /**
   * Returns a ProjectPage of all projects in the backend DB with no filtering
   * other than the required page & order.
   * @param page Page number. Starts at 0.
   * @param order Order of the projects. Must be a SortOrder enum.
   */
  fetchAll(page: number, order: string): void {
    this.projectService.fetchAll(page, order)
      .subscribe(
        data => this.projectPage = data,
        err => console.error(err.message)
      );
  }

  nextPage(): void {
    this.fetchAll(++this.projectPage.number, this.order);
  }

  previousPage(): void {
    this.fetchAll(--this.projectPage.number, this.order);
  }

  filterByExample(page: number, example: ProjectCreation): void {
    if (this.filteredQuery !== example && example != null) {
      this.filteredQuery = example;
    }

    this.projectService.searchProjects(page, this.order, this.orderBy, example)
      .subscribe(
        data => this.projectPage = data,
        err => console.error(err.message)
      );
  }

  postForm() {
    this.router.navigate(['projects', 'post'])
      .catch((err: Error) => (console.error(err.message)))
  }

  sortByOldest(): void {
    this.order = SortOrder.ASC;
    this.fetchAll(0, this.order);
  }

}
