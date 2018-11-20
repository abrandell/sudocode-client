import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {IProject} from '../IProject';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {ProjectListComponent} from '../project-list/project-list.component';
import {Subject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],

})
export class ProjectDetailComponent implements OnInit {

  public editing: boolean;
  protected project: IProject;
  protected projectId: number;
  private destroy = new Subject();

  constructor(protected projectService: ProjectService,
              private route: ActivatedRoute,
              protected auth: AuthService,
              private router: Router, private projectList: ProjectListComponent,
              private modalService: NgbModal) {

    this.route.params.pipe(takeUntil(this.destroy))
      .subscribe(
        params => this.projectId = params.id,
        err => console.log(err)
      );
  }

  isAuthor(): boolean {
    if (this.auth.currentUser === undefined || this.project === undefined) {
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
          () => {
            this.modalService.dismissAll();
            this.projectList.ngOnInit();
          })
        .add(() => this.router.navigate(['projects']));
    }
  }

  confirmDelete(content) {
    this.modalService.open(content, {centered: true});
  }

  ngOnInit() {
    this.fetchProject();
  }

  edit() {
    this.editing = true;
  }

  private fetchProject(): void {
    this.projectService.fetchById(this.projectId)
      .subscribe(
        data => this.project = data,
        err => console.error(err.message)
      );
  }


}
