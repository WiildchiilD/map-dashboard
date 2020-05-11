import {Model} from './Model';
import {User} from './User';

export interface Bracelet {
  _id: string;
  model: Model;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}


