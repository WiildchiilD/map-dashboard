import {Model} from './Model';

export interface Bracelet {
  _id: string;
  model: Model;
  createdAt: Date;
  updatedAt: Date;
  user: string;
}


