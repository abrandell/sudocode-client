import {IUser} from '../shared/IUser';

export class User implements IUser {

  constructor(private _id?: number,
              private _login?: string,
              private _avatar_url?: string,
              private _hireable?: boolean,
              private _name?: string) {
  }

  get id(): number {
    return this._id;
  }

  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  get avatar_url(): string {
    return this._avatar_url;
  }

  set avatar_url(value: string) {
    this._avatar_url = value;
  }

  get hireable(): boolean {
    return this._hireable;
  }

  set hireable(value: boolean) {
    this._hireable = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }


}
