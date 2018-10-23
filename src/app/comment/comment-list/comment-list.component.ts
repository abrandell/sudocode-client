import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {AuthService} from '../../shared/auth.service';
import {CommentPage} from '../../shared/comment-page';
import {SortOrder} from '../../shared/sort-order';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() projectId: number;

  public commentPage: CommentPage;
  protected pageNum: number;
  private order: SortOrder;

  constructor(private projectService: ProjectService, protected auth: AuthService) { }

  ngOnInit() {
    this.pageNum = 0;
    this.sortByNewest();
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
    if (!this.commentPage.last) {
      this.pageNum++;
      this.fetchComments();
    }
  }

  protected prevCommentPage(): void {
    if (!this.commentPage.first) {
      this.pageNum--;
      this.fetchComments();
    }
  }

  private fetchComments(): void {
      this.projectService.fetchProjectComments(this.projectId, this.order, this.pageNum)
      .subscribe(
        data => this.commentPage = data,
        err => console.log(err)
      );
  }
}
