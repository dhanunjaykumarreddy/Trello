import * as BoardActions from './board.actions';
import { Board } from 'src/app/shared/board.model';
import { List } from 'src/app/shared/list.model';

describe('AddBoard', () => {
  it('should create an action', () => {
    const payload = new Board('', []);
    const action = new BoardActions.AddBoard(payload)
    expect({ ...action }).toEqual({ type: BoardActions.ADD_BOARD, payload });
  });
});

describe('DeleteBoard', () => {
  it('should create an action', () => {
    const payload = 0;
    const action = new BoardActions.DeleteBoard(payload)
    expect({ ...action }).toEqual({ type: BoardActions.DELETE_BOARD, payload });
  });
});

describe('UpdateList', () => {
  it('should create an action', () => {
    const payload = { boardId: 0, listId: 0, updatedList: new List('', []) };
    const action = new BoardActions.UpdateList(payload)
    expect({ ...action }).toEqual({ type: BoardActions.UPDATE_LIST, payload });
  });
});

describe('AddList', () => {
  it('should create an action', () => {
    const payload = { boardId: 0, newList: new List('', []) };
    const action = new BoardActions.AddList(payload)
    expect({ ...action }).toEqual({ type: BoardActions.ADD_LIST, payload });
  });
});

describe('DeleteList', () => {
  it('should create an action', () => {
    const payload = { boardId: 0, listId: 0 };
    const action = new BoardActions.DeleteList(payload)
    expect({ ...action }).toEqual({ type: BoardActions.DELETE_LIST, payload });
  });
});
