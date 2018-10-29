import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../IProject';
import {AuthService} from '../../shared/auth.service';
import {IUser} from '../../shared/IUser';
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
    this.router.navigateByUrl(`/projects/${this.project.id}`);
  }

  public setColor(text: string): string {
    switch (text) {
      case 'beginner': {
        return 'green';
      }
      case 'intermediate': {
        return 'blue';
      }
      case 'advanced': {
        return 'red';
      }
    }
  }

}
