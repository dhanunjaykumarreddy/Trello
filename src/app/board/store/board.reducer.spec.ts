import { boardReducer } from "./board.reducer";
import { initialState } from './board.reducer';

import * as BoardActions from './board.actions';
import { Board } from 'src/app/shared/board.model';
import { List } from 'src/app/shared/list.model';

const action: BoardActions.BoardActions = {
  payload: undefined,
  type: undefined
};

const board: Board = new Board('NewTest', []);
const list: List = new List('NewTestList', []);


describe('BoardReducer', () => {
  it('should handle initial state', () => {
    expect(boardReducer(undefined, action)).toEqual({boards: []});
  })

  it('should handle ADD_BOARD', () => {
    expect(boardReducer(initialState, { type: BoardActions.ADD_BOARD, payload: board })).toEqual({boards: [board]});
  });

  it('should handle DELETE_BOARD', () => {
    expect(boardReducer({ boards: [board] }, { type: BoardActions.DELETE_BOARD, payload: 0 })).toEqual({boards: []});
  });

  it('should handle UPDATE_LIST', () => {
    expect(boardReducer(
      {
        boards: [{ title: 'Test', lists: [{ title: 'TestList', tasks: [] }]
        }]
      },
      {
        type: BoardActions.UPDATE_LIST,
        payload: {
          boardId: 0, listId: 0, updatedList: list
        }
      })).toEqual({
        boards: [{ title: 'Test', lists: [list] }]
      }
    );
    console.log(initialState);
  });

  it('should handle ADD_LIST', () => {
    expect(boardReducer(
      {
        boards: [{ title: 'Test', lists: [] }]
      },
      {
        type: BoardActions.ADD_LIST,
        payload: {
          boardId: 0, newList: list
        }
      })).toEqual({
        boards: [{ title: 'Test', lists: [list] }]
      }
    );
  });

  it('should handle DELETE_LIST', () => {
    expect(boardReducer(
      {
        boards: [{
          title: 'Test',
          lists: [list]
        }]
      },
      {
        type: BoardActions.DELETE_LIST,
        payload: {
          boardId: 0, listId: 0
        }
      })).toEqual({
        boards: [{ title: 'Test', lists: [] }]
      }
    );
  });
});
