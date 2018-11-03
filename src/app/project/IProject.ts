import {IUser} from '../shared/IUser';

export interface IProject {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  date_posted: string;
  rating: number;
  author: IUser;
}
