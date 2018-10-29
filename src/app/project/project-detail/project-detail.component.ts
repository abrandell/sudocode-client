import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {IProject} from '../IProject';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentPage} from '../../shared/comment-page';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {SortOrder} from '../../shared/sort-order';
import {AuthService} from '../../shared/auth.service';
import {ProjectListComponent} from '../project-list/project-list.component';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],

})
export class ProjectDetailComponent implements OnInit {

  protected project: IProject;
  protected comments: CommentPage;
  protected projectId: number;
  protected pageNum: number;
  private order: SortOrder;
  protected isAuthenticated: boolean;
  editing: boolean;

  constructor(protected projectService: ProjectService,
              private route: ActivatedRoute,
              protected auth: AuthService,
              private router: Router, private projectList: ProjectListComponent) {

    this.route.params.subscribe(
      params => this.projectId = params.id,
      err => console.log(err)
    );
  }

  isAuthor(): boolean {
    if (this.auth.currentUser == null || this.project == null) {
      return false;
    }

    return this.auth.currentUser.id === this.project.author.id;
  }

  deleteProject(): void {
    if (this.isAuthor()) {
      this.projectService.deleteProject(this.projectId)
          .subscribe(
            status => console.log(status),
            err => console.log(err),
            () => this.projectList.ngOnInit())
          .add(() => this.router.navigate(['projects']));
    }
  }

  ngOnInit() {
    this.fetchProject();
  }

  edit() {
    this.editing = true;
  }

  editProject() {

  }

  private fetchProject(): void {
    this.projectService.fetchById(this.projectId)
        .subscribe(
          data => this.project = data,
          err => console.log(err)
        );
  }



}
