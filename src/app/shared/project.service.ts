import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IProject} from '../project/IProject';
import {HttpClient} from '@angular/common/http';
import {ProjectPage} from './project-page';
import {ProjectCreation} from '../project/project-search/project-creation';
import {CommentPage} from './comment-page';
import {CommentCreation} from '../comment/comment-post/comment-creation';
import {IComment} from './IComment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private URL = '/api/projects';

  constructor(private http: HttpClient) {
  }

  /**
   * Returns a ProjectPage of all projects in the backend DB with no filtering other than the required page & order.
   * @param page Page number. Starts at 0.
   * @param sortOrder Order of the projects. Must either be 'desc' or 'asc'.
   */
  public fetchAll(page: number, sortOrder: string): Observable<ProjectPage> {
    return this.http.get<ProjectPage>(
      `${this.URL}?page=${page}&sort=datePosted,${sortOrder}`
    );
  }

  public fetchById(id: number): Observable<IProject> {
    return this.http.get<IProject>(
      `${this.URL}/${id}`
    );
  }

  public post(project: ProjectCreation): Observable<IProject> {
    return this.http.post<IProject>(this.URL, project);
  }

  public postComment(projectId: number, comment: CommentCreation): Observable<IComment> {
    return this.http.post<IComment>(
      `${this.URL}/${projectId}/comments`, comment
    );
  }

  public fetchProjectComments(projectId: number, sortOrder: string, pageNum: number): Observable<CommentPage> {
    return this.http.get<CommentPage>(
      `${this.URL}/${projectId}/comments?page=${pageNum}&sort=datePosted,${sortOrder}`
    );
  }

  public deleteComment(projectId: number, commentId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.URL}/${projectId}/comments/${commentId}`
    );
  }

  public deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${projectId}`);
  }

  public editComment(comment: IComment) {
    // todo
  }

  public updateProject(project: IProject): Observable<IProject> {
    return this.http.put<IProject>(`${this.URL}/${project.id}`, project);
  }


  // TODO remove the hardcoded sort
  public searchProjects(page: number, sortOrder: string, values: ProjectCreation): Observable<ProjectPage> {
    return this.http.get<ProjectPage>(
      this.URL
      + `?title=${values.title}`
      + `&difficulty=${values.difficulty}`
      + `&description=${values.description}`
      + `&page=${page}`
      + `&sort=datePosted,${sortOrder}`
    );
  }
}
