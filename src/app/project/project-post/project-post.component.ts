import {Component, OnInit} from '@angular/core';
import {ProjectCreation} from '../project-search/project-creation';
import {ProjectService} from '../../shared/project.service';
import {Router} from '@angular/router';
import {ProjectListComponent} from '../project-list/project-list.component';

@Component({
  selector: 'app-project-post',
  templateUrl: './project-post.component.html',
  styleUrls: ['./project-post.component.scss']
})
export class ProjectPostComponent {

  difficulty = [
    'basic',
    'beginner',
    'intermediate',
    'advanced',
    'expert'
  ];

  model = new ProjectCreation('', '', '');
  submitted: boolean;

  constructor(private projectService: ProjectService,
              private router: Router,
              public projectList: ProjectListComponent) {
  }

  public submit(): void {
    this.projectService.post(this.model)
        .subscribe(
          status => console.log(status),
          err => console.log(err),
          () => this.projectList.ngOnInit())
        .add(() => this.router.navigate(['projects'])
    );

  }

  get diagnostic(): string {
    return JSON.stringify(this.model);
  }


}
