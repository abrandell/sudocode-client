import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IProject} from '../project/IProject';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ProjectPage} from './project-page';
import {ProjectCreation} from '../project/project-search/project-creation';
import {CommentPage} from './comment-page';
import {CommentCreation} from '../comment/comment-post/comment-creation';
import {IComment} from './IComment';
import {Difficulty} from './difficulty';
import {Vote} from "./vote.enum";
import {SortOrder} from './sort-order';
import {OrderBy} from './order-by.enum';


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
   * @param orderBy The property to order by. ie. ['rating', datePosted, etc']
   * @param sortOrder Order of the projects. Must either be 'desc' or 'asc'.
   */
  public fetchAll(page: number, orderBy: OrderBy, sortOrder: SortOrder): Observable<ProjectPage> {
    return this.http.get<ProjectPage>(
      `${this.URL}?page=${page}&sort=${orderBy},${sortOrder}`
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

  public postComment(projectId: number, comment: CommentCreation): Observable<HttpResponse<IComment>> {
    return this.http.post<IComment>(
      `${this.URL}/${projectId}/comments`, comment,
      {observe: 'response'}
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

  public editComment(comment: IComment, projectId: number) {
    return this.http.put<IComment>(`${this.URL}/${projectId}/comments/${comment.id}`, comment);
  }

  public updateProject(project: IProject): Observable<IProject> {
    return this.http.put<IProject>(`${this.URL}/${project.id}`, project);
  }

  public voteOnProject(vote: Vote, projectId: number): void {
    this.http.post(`${this.URL}/${projectId}/vote?dir=${vote}`, {}).subscribe(() => {});
  }

  public searchProjects(page: number, orderBy: OrderBy, sortOrder: SortOrder, values: ProjectCreation): Observable<ProjectPage> {
    return this.http.get<ProjectPage>(
      this.URL
      + `?title=${values.title}`
      + `&difficulty=${values.difficulty}`
      + `&description=${values.description}`
      + `&page=${page}`
      + `&sort=rating,${sortOrder}` /*TODO: Fix me*/
    );
  }

  public setColor(difficulty: Difficulty): string {
    switch (difficulty) {
      case Difficulty.BASIC: {
        return "#858585";
      }
      case Difficulty.BEGINNER: {
        return "#2b803e";
      }
      case Difficulty.INTERMEDIATE: {
        return "#2a628e";
      }
      case Difficulty.ADVANCED: {
        return "#aa7308";
      }
      case Difficulty.EXPERT: {
        return "#aa1828";
      }


    }

  }
}
