import { Action } from '@ngrx/store';

import { Board } from 'src/app/shared/board.model';
import { List } from 'src/app/shared/list.model';

export const ADD_BOARD = '[Board] Add Board';
export const DELETE_BOARD = '[Board] Delete Board';
export const UPDATE_LIST = '[Board] Update LIST';
export const ADD_LIST = '[Board] Add List';
export const DELETE_LIST = '[Board] Delete List';

export class AddBoard implements Action {
  readonly type = ADD_BOARD;

  constructor(public payload: Board) {}
}

export class DeleteBoard implements Action {
  readonly type = DELETE_BOARD;

  constructor(public payload: number) {}
}

export class UpdateList implements Action {
  readonly type = UPDATE_LIST;

  constructor(public payload: {boardId: number, listId: number, updatedList: List}) {}
}

export class AddList implements Action {
  readonly type = ADD_LIST;

  constructor(public payload: {boardId: number, newList: List}) {}
}

export class DeleteList implements Action {
  readonly type = DELETE_LIST;

  constructor(public payload: {boardId: number, listId: number}) {}
}

export type BoardActions =
  | AddBoard
  | DeleteBoard
  | UpdateList
  | AddList
  | DeleteList;

