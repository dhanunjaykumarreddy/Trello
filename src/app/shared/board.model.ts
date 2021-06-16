import { List } from './list.model';

export class Board {
  constructor(public title: string, public lists: List[]) {}
}
