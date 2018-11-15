import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {CommentCardComponent} from '../comment-card/comment-card.component';
import {IComment} from '../../shared/IComment';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {


  constructor(private projectService: ProjectService, public commentCard: CommentCardComponent) { }

  ngOnInit() {
  }

}
