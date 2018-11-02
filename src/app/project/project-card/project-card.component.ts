import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../IProject';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {ProjectService} from '../../shared/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: IProject;

  constructor(protected service: ProjectService, protected auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  protected getDetails(): void {
    this.router.navigate(['projects', this.project.id])
      .catch((err: Error) => console.error(err.message));
  }

}
