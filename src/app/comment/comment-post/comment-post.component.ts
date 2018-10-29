import {IComment} from './../../shared/IComment';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommentCreation} from './comment-creation';
import {AuthService} from '../../shared/auth.service';
import {ProjectService} from '../../shared/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectDetailComponent} from '../../project/project-detail/project-detail.component';
import {CommentListComponent} from '../comment-list/comment-list.component';

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
              private commentList: CommentListComponent) {
    this.comment = new CommentCreation('');
  }

  get diagnostic(): string {
    return JSON.stringify(this.comment);
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.projectId = params.id,
      err => console.log(err)
    );
  }

  public submit() {
    this.comment.body = this.comment.body.trim();

    let submittedComment: IComment;

    this.projectService.postComment(this.projectId, this.comment)
        .subscribe(
          data => submittedComment = data,
          err => console.log(err),
          () => this.commentList.refreshCommentList())
        .add(document.getElementById('clear').click());
  }

  protected showClearButton(): boolean {
    return this.comment.body !== null && this.comment.body.length > 0;
  }

  isFormValid() {
    return this.comment.body !== null && this.comment.body.trim().length >= 3;
  }
}
