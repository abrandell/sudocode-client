import {Component, Input, OnInit} from '@angular/core';
import {IComment} from "../../shared/IComment";
import {FormBuilder, ValidatorFn, Validators} from "@angular/forms";
import {CommentPostComponent} from "../comment-post/comment-post.component";
import {ProjectService} from "../../shared/project.service";
import {CommentCreation} from "../comment-post/comment-creation";
import {ActivatedRoute} from "@angular/router";
import {CommentListComponent} from "../comment-list/comment-list.component";

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {

  submitted = false;
  private projectId: number;
  @Input() comment: IComment;
  @Input() validator: ValidatorFn;

  constructor(protected fb: FormBuilder,
              private commentPost: CommentPostComponent,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private commentList: CommentListComponent) {
    this.activatedRoute.params.subscribe(params => params.id = this.projectId);
  }

  commentEditForm = this.fb.group({
    body: [{value: this.comment.body},
      [Validators.required, this.commentPost.textLengthTrimValidator(3)]
    ]});


  saveEdit() {
    const formValue: string = this.commentEditForm.controls['body'].value;
    const newComment = new CommentCreation(formValue.trim());

    this.projectService.editComment(newComment, this.projectId, this.comment.id)
      .subscribe(
        data => console.log(data),
        err => new Error(err),
        () => this.commentList.refreshCommentList())
      .add(() => {
        this.submitted = true;
      });

  }


  ngOnInit() {
  }

}
