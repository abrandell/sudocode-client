import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../shared/IComment';
import {AuthService} from '../../shared/auth.service';
import {ProjectService} from '../../shared/project.service';
import {ActivatedRoute} from '@angular/router';
import {ProjectDetailComponent} from '../../project/project-detail/project-detail.component';
import {CommentListComponent} from '../comment-list/comment-list.component';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() comment: IComment;
  private projectId: number;

  constructor(protected auth: AuthService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private commentList: CommentListComponent) {
    this.route.params.subscribe(
      params => this.projectId = params.id,
      err => console.log(err)
    );
  }

  ngOnInit() {
  }

  protected deleteComment(): void {
    this.projectService.deleteComment(this.projectId, this.comment.id)
      .subscribe(
        () => {},
        err => console.log(err),
        () => this.commentList.refreshCommentList()
      );

  }
}
