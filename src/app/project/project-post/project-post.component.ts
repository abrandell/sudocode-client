import { Component, OnInit } from '@angular/core';
import {ProjectCreation} from '../project-search/project-creation';
import {ProjectService} from '../../shared/project.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  submitted = false;

  constructor(private projectService: ProjectService, private router: Router) { }

  protected submit(): void {
    this.submitted = true;
    this.projectService.post(this.model)
      .subscribe(
        status => console.log(status),
          err => console.log(err)
      );

    this.router.navigateByUrl('/projects').then(() => {});
  }

  get diagnostic(): string {
    return JSON.stringify(this.model);
  }



}
