import {IUser} from './IUser';

export interface IComment {
  id: number;
  body: string;
  author: IUser;
  date_posted: string;
}
