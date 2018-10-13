import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../IProject';
import {AuthService} from '../../shared/auth.service';
import {IUser} from '../../shared/IUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: IProject;

  constructor(protected auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  protected getDetails(): void {
    this.router.navigateByUrl(`/projects/${this.project.id}`);
  }


}
