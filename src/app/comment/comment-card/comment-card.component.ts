import {Component, Input, OnInit, Output} from '@angular/core';
import {IComment} from '../../shared/IComment';
import {AuthService} from '../../shared/auth.service';
import {ProjectService} from '../../shared/project.service';
import {ActivatedRoute} from '@angular/router';
import {ProjectDetailComponent} from '../../project/project-detail/project-detail.component';
import {CommentListComponent} from '../comment-list/comment-list.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-comment-card',
    templateUrl: './comment-card.component.html',
    styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {


    @Input() comment: IComment;

    protected editing = false;
    private projectId: number;

    constructor(protected auth: AuthService,
                private projectService: ProjectService,
                private route: ActivatedRoute,
                private commentList: CommentListComponent,
                private modalService: NgbModal) {
        this.route.params.subscribe(
            params => this.projectId = params.id,
            err => console.log(err)
        );
    }

    ngOnInit() {
    }

    confirmDelete(content) {
        this.modalService.open(content, {centered: true});
    }

    editComment() {
        this.editing = !this.editing;
    }

    saveChanges() {
        this.projectService.editComment(this.comment, this.projectId)
            .subscribe(
                status => console.log(status),
                err => console.error(err.message),
                () => this.editing = false
            );
    }

    protected deleteComment(): void {
        this.projectService.deleteComment(this.projectId, this.comment.id)
            .subscribe(
                () => {},
                err => console.error(err.message),
                () => this.commentList.refreshCommentList())
            .add(this.modalService.dismissAll());

    }

    protected cancel() {
      this.editing = false;
    }
}
