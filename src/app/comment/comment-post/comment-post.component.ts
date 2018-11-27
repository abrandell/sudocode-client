import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentCreation} from './comment-creation';
import {AuthService} from '../../shared/auth.service';
import {ProjectService} from '../../shared/project.service';
import {ActivatedRoute} from '@angular/router';
import {CommentListComponent} from '../comment-list/comment-list.component';
import {FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {IComment} from "../../shared/IComment";
import {LoginUrl} from '../../shared/login-url.enum';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.scss'],
  animations: [
    trigger('formValid', [
      state('invalid', style({
        opacity: '.5'
      })),
      state('valid', style({
        opacity: '1'
      })),
      transition('invalid => valid', [
        animate('.5s ease-in')
      ]),
      transition('valid => invalid', [
        animate('.5s ease-out')
      ])
    ])
  ]
})
export class CommentPostComponent implements OnInit, OnDestroy {

  commentPostForm = this.fb.group({
    body: [{value: '', disabled: !this.auth.authenticated},
      [
        Validators.required,
        this.textLengthTrimValidator(3)
      ]
    ]
  });
  submitted: boolean;
  private projectId: number;
  private destroy = new Subject();

  constructor(public auth: AuthService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private commentList: CommentListComponent,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy))
      .subscribe(
        params => this.projectId = params.id,
        err => console.error(err.message)
      );
  }

  public submit(): void {
    const formValue: string = this.commentPostForm.controls['body'].value;
    const newComment = new CommentCreation(formValue.trim());

    this.projectService.postComment(this.projectId, newComment)
      .subscribe(
        (data: HttpResponse<IComment>) => console.log(data.status),
        (err: Error) => console.log(err.message),
        () => this.commentList.refreshCommentList())
      .add(() => {
        this.clearText();
        this.submitted = true;
      });

    /* To make the 'comment submitted' alert disappear after 5 seconds. */
    setTimeout(() => this.submitted = false, 5000);
  }

  public textLengthTrimValidator(requiredLength: number): ValidatorFn {
    return (control): { [key: string]: any } | undefined => {

      const text = control.value.toString();
      const invalid = (text === undefined || text.trim().length < requiredLength);

      return invalid ? {'Not required length': text} : undefined;
    };
  }

  login() {
    window.location.href = LoginUrl.HEROKU;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  protected clearText(): void {
    this.commentPostForm.patchValue({body: ''});
    this.commentPostForm.markAsPristine();
  }
}
