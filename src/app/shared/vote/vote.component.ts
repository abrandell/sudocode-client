import {Component, Input, NgModule, OnInit} from '@angular/core';
import {IProject} from '../../project/IProject';
import {ProjectService} from '../project.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Vote} from '../vote.enum';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() project: IProject;
  upvoted: boolean = false;
  downvoted: boolean = false;

  constructor(public service: ProjectService, public auth: AuthService) {
  }

  ngOnInit() {
  }

  upVote() {
    this.upvoted = !this.upvoted;
    if (this.upvoted) {
      this.project.rating++;
      this.service.voteOnProject(Vote.UPVOTE, this.project.id);
    } else {
      this.unVote();
    }
  }

  unVote() {
    this.service.voteOnProject(Vote.UNVOTE, this.project.id);
  }

  downVote() {
    this.downvoted = !this.downvoted;
    if (this.downvoted) {
      this.project.rating--;
      this.service.voteOnProject(Vote.DOWNVOTE, this.project.id);
    } else {
      this.unVote();
    }
  }

}
