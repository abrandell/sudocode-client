import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectCreation} from '../project-search/project-creation';
import {ProjectService} from '../../shared/project.service';
import {Router} from '@angular/router';
import {ProjectListComponent} from '../project-list/project-list.component';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-project-post',
  templateUrl: './project-post.component.html',
  styleUrls: ['./project-post.component.scss']
})
export class ProjectPostComponent implements OnDestroy{

  difficulty = [
    'basic',
    'beginner',
    'intermediate',
    'advanced',
    'expert'
  ];

  model = new ProjectCreation('', '', '');
  private submitted = false;

  constructor(private projectService: ProjectService,
              private router: Router,
              public projectList: ProjectListComponent) {
  }

  public submit(): void {
    this.projectService.post(this.model)
        .subscribe(
          status => console.log(status),
          err =>  console.error(err.message),
          () => this.submitted = true)
      .add(() => this.router.navigate(['projects']).then(() => this.projectList.ngOnInit));
  }

  get diagnostic(): string {
    return JSON.stringify(this.model);
  }

  ngOnDestroy(): void {
    this.submitted = false;
  }


}
