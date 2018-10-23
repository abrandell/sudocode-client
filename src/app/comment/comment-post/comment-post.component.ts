import { IComment } from './../../shared/IComment';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommentCreation} from './comment-creation';
import {AuthService} from '../../shared/auth.service';
import {ProjectService} from '../../shared/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectDetailComponent} from '../../project/project-detail/project-detail.component';

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
              private router: Router,
              private projectDetail: ProjectDetailComponent) {
    this.comment = new CommentCreation('');
  }


  ngOnInit() {
    this.route.params.subscribe(
      params => this.projectId = params.id,
      err => console.log(err)
    );
  }

  public submit() {
    let submittedComment: IComment;

    this.projectService.postComment(this.projectId, this.comment)
      .subscribe(
        data => submittedComment = data,
        err => console.log(err),
        () => this.projectDetail.refreshCommentList());
  }





  get diagnostic(): string {
    return JSON.stringify(this.comment);
  }
}
