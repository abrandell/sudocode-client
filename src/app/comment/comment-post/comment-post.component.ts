import {IComment} from '../../shared/IComment';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentCreation} from './comment-creation';
import {AuthService} from '../../shared/auth.service';
import {ProjectService} from '../../shared/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentListComponent} from '../comment-list/comment-list.component';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

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

  private projectId: number;
  submitted: boolean;
  private destroy = new Subject();

  commentPostForm = this.formBuilder.group({
    body: [{value: '', disabled: !this.auth.authenticated},
          [Validators.required, this.textLengthTrimValidator(3)]
    ]});

  constructor(protected auth: AuthService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private commentList: CommentListComponent,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        params => this.projectId = params.id,
        err => console.log(err)
      );
  }

  public submit() {
    const formValue: string = this.commentPostForm.controls['body'].value;
    const newComment = new CommentCreation(formValue.trim());

    this.projectService.postComment(this.projectId, newComment)
      .subscribe(
        data => console.log(data.status),
        err => new Error(err),
        () => this.commentList.refreshCommentList())
      .add(() => {
        this.clearText();
        this.submitted = true;
      });

    /* To make the 'comment submitted' alert disappear after 5 seconds. */
    setTimeout(() => this.submitted = false, 5000);
  }

  protected clearText() {
    this.commentPostForm.patchValue({body: ''});
    this.commentPostForm.markAsPristine();
  }


  public textLengthTrimValidator(requiredLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      const text = control.value.toString();
      const invalid = (text === null || text.trim().length < requiredLength);

      return invalid ? {'Not required length': text} : null;
    };
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
