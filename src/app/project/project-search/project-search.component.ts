import { Component, OnInit } from '@angular/core';
import {ProjectCreation} from './project-creation';
import {ProjectListComponent} from '../project-list/project-list.component';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss']
})
export class ProjectSearchComponent {

  difficulty = [
    'basic',
    'beginner',
    'intermediate',
    'advanced',
    'expert'
  ];

  searchedQuery = new ProjectCreation('', '', '');

  constructor(private list: ProjectListComponent) { }

  get diagnostic() {
    return JSON.stringify(this.searchedQuery);
  }

  filterProjects(): void {
    this.list.filterByExample(0, this.searchedQuery);

  }
}
