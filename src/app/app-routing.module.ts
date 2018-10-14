import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectListComponent} from './project/project-list/project-list.component';
import {ProjectPostComponent} from './project/project-post/project-post.component';
import {AboutComponent} from './about/about.component';
import {ProjectDetailComponent} from './project/project-detail/project-detail.component';
import {UserListComponent} from './user/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectListComponent,
    data: {title: 'Projects'}
  },
  {
    path: 'projects/post',
    component: ProjectPostComponent,
    data: {title: 'New Project'}
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    data: {title: 'Project Details'}
  },
  {
    path: 'users',
    component: UserListComponent,
    data: {title: 'Users'}
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {title: 'About'}
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
