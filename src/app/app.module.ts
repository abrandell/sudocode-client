import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectCardComponent } from './project/project-card/project-card.component';
import { ProjectPostComponent } from './project/project-post/project-post.component';
import { ProjectSearchComponent } from './project/project-search/project-search.component';
import { HeaderComponent } from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectService} from './shared/project.service';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { CommentPostComponent } from './comment/comment-post/comment-post.component';
import { CommentCardComponent } from './comment/comment-card/comment-card.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCardComponent } from './user/user-card/user-card.component';
import {UserService} from './shared/user.service';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {EllipsisPipe} from "./shared/pipes/ellipsis.pipe";
import { NotFoundComponent } from './not-found/not-found.component';
import { VoteComponent } from './shared/vote/vote.component';


@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectListComponent,
    ProjectCardComponent,
    ProjectPostComponent,
    ProjectSearchComponent,
    HeaderComponent,
    AboutComponent,
    FooterComponent,
    ProjectDetailComponent,
    CommentPostComponent,
    CommentCardComponent,
    UserListComponent,
    UserCardComponent,
    ProjectEditComponent,
    CommentListComponent,
    EllipsisPipe,
    NotFoundComponent,
    VoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    ProjectService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    UserService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    ProjectListComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
