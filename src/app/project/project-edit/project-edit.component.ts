import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IProject} from '../IProject';
import {ProjectService} from '../../shared/project.service';
import {ProjectDetailComponent} from '../project-detail/project-detail.component';
import {ProjectCreation} from '../project-search/project-creation';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit, OnDestroy {

  @Input() project: IProject;
  editing = true;
  private destroy = new Subject();

  difficulty = [
    'basic',
    'beginner',
    'intermediate',
    'advanced',
    'expert'
  ];


  constructor(private service: ProjectService, public projectDetail: ProjectDetailComponent) {
  }

  ngOnInit() {
  }

  editProject() {
    return this.service.updateProject(this.project)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        status => console.log(status),
        err => console.log(err),
        () => this.projectDetail.editing = false
      );
  }

  cancel() {
    this.projectDetail.editing = false;
  }

  get diagnostic() {
    return JSON.stringify(this.project);
  }

  ngOnDestroy(): void {
    console.log('ProjectEdit destroyed');
    this.destroy.next();
    this.destroy.complete();
  }


}
