import { Board } from 'src/app/shared/board.model';
import * as BoardActions from './board.actions';

export interface State {
  boards: Board[];
}

export const initialState: State = {
  boards: []
};

export function boardReducer(state: State = initialState, action: BoardActions.BoardActions) {
  switch(action.type) {
    case BoardActions.ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      };
    case BoardActions.DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board, index) => {
          return index !== action.payload;
        })
      };
    case BoardActions.UPDATE_LIST:
      const updatedBoard = {
        ...state.boards[action.payload.boardId]
      };

      const updatedBoards = [...state.boards];
      updatedBoard.lists[action.payload.listId] = action.payload.updatedList;
      updatedBoards[action.payload.boardId] = updatedBoard

      return {
        ...state,
        boards: updatedBoards
      };
    case BoardActions.ADD_LIST:
      const changedBoard = {
        ...state.boards[action.payload.boardId]
      }

      const changedBoards = [...state.boards];
      changedBoard.lists.unshift(action.payload.newList);
      changedBoards[action.payload.boardId] = changedBoard;

      return {
        ...state,
        boards: changedBoards
      };
    case BoardActions.DELETE_LIST:
      const chosenBoard = {
        ...state.boards[action.payload.boardId]
      }

      const chosenBoards = [...state.boards];
      chosenBoard.lists.splice(action.payload.listId, 1);
      chosenBoards[action.payload.boardId] = chosenBoard;

      return {
        ...state,
        boards: chosenBoards
      };
    default:
      return state;
  }
}
