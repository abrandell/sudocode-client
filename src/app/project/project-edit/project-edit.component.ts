import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../IProject';
import {ProjectService} from '../../shared/project.service';
import {ProjectDetailComponent} from '../project-detail/project-detail.component';
import {ProjectCreation} from '../project-search/project-creation';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  @Input() project: IProject;
  editing = true;

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



}
