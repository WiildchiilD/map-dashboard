import {User} from './User';
import {Bracelet} from './Bracelet';

export interface History {
  _id: string;
  longitude: number;
  latitude: number;
  user: User;
  bracelet: Bracelet;
  place: string;
  createdAt: Date;
  updatedAt: Date;
}
