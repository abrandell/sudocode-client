import {Component, DoCheck, Input, OnDestroy, OnInit, SimpleChange} from '@angular/core';
import {CommentPage} from '../../shared/comment-page';
import {SortOrder} from '../../shared/sort-order';
import {ProjectService} from '../../shared/project.service';
import {ActivatedRoute} from '@angular/router';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {IComment} from '../../shared/IComment';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

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
export class CommentListComponent implements OnInit, OnDestroy {

  private destroy = new Subject();

  comments: CommentPage;
  pageNum: number;
  projectId: number;
  private order: SortOrder;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.route.params.pipe(takeUntil(this.destroy))
      .subscribe(
      params => this.projectId = params.id,
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.pageNum = 0;
    this.sortByNewest();

  }

  sortByOldest(): void {
    this.order = SortOrder.ASC;
    this.fetchComments();
  }

  sortByNewest(): void {
    this.order = SortOrder.DESC;
    this.fetchComments();
  }


  nextCommentPage(): void {
    if (!this.comments.last) {
      this.pageNum++;
      this.fetchComments();
    }
  }

  prevCommentPage(): void {
    if (!this.comments.first) {
      this.pageNum--;
      this.fetchComments();
    }
  }

  private fetchComments(): void {
    this.projectService.fetchProjectComments(this.projectId, this.order, this.pageNum)
        .subscribe(
          data => this.comments = data,
          err => console.error(err.message)
        );
  }


  public refreshCommentList(): void {
    this.sortByNewest();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
