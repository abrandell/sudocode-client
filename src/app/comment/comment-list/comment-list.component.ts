import {Component, DoCheck, Input, OnInit, SimpleChange} from '@angular/core';
import {CommentPage} from '../../shared/comment-page';
import {SortOrder} from '../../shared/sort-order';
import {ProjectService} from '../../shared/project.service';
import {ActivatedRoute} from '@angular/router';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {IComment} from '../../shared/IComment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({opacity: 0, transform: 'translateY(-15px)'}),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({opacity: 1, transform: 'translateY(0px)'})
              )
            )
          ],
          {optional: true}
        ),
      ])
    ])
  ]
})
export class CommentListComponent implements OnInit {

  protected comments: CommentPage;
  public commentArray: IComment[];
  protected pageNum: number;
  protected projectId: number;
  private order: SortOrder;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.projectId = params.id,
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.pageNum = 0;
    this.sortByNewest();
    if (this.comments) {
      this.commentArray = this.comments.content;
    }
  }

  protected sortByOldest(): void {
    this.order = SortOrder.ASC;
    this.fetchComments();
  }

  protected sortByNewest(): void {
    this.order = SortOrder.DESC;
    this.fetchComments();
  }


  protected nextCommentPage(): void {
    if (!this.comments.last) {
      this.pageNum++;
      this.fetchComments();
    }
  }

  protected prevCommentPage(): void {
    if (!this.comments.first) {
      this.pageNum--;
      this.fetchComments();
    }
  }

  private fetchComments(): void {
    this.projectService.fetchProjectComments(this.projectId, this.order, this.pageNum)
        .subscribe(
          data => this.comments = data,
          err => console.log(err)
        );
  }


  public refreshCommentList(): void {
    this.sortByNewest();
  }

  newCommentPosted(comment: IComment) {
    this.commentArray.push(comment);
  }



}
