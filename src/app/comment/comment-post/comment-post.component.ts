import { Component, OnInit } from '@angular/core';
import {CommentCreation} from './comment-creation';
import {AuthService} from '../../shared/auth.service';
import {ProjectService} from '../../shared/project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.scss']
})
export class CommentPostComponent implements OnInit {

  protected comment: CommentCreation;
  protected submitted = false;
  private projectId: number;

  constructor(protected auth: AuthService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) {
    this.comment = new CommentCreation('');
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.projectId = params.id,
      err => console.log(err)
    );
  }

  protected submit(): void {
    this.submitted = true;
    this.projectService.postComment(this.projectId, this.comment)
      .subscribe(
      status => console.log(status),
        err => console.log(err)
    );

    this.router.navigate(['projects', this.projectId]).then(() => {});
  }

  get diagnostic(): string {
    return JSON.stringify(this.comment);
  }
}
