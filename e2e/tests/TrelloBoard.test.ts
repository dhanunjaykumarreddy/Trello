import { Selector } from 'testcafe'; 
import NewBoardPage from '../page-objects/New-Board.page';

fixture `Trello Script`
  .page('http://localhost:4200/board')

const boardName = "Test Board";
const boardName1 = "Test Board 1";
const boardName2 = "Test Board 2";
const boardItem1 = "Test Board Item 1";
const taskName = "Task";
const taskName1 = "Task 1";

test('Verify if user is able to add new board', async t => {
    
    await NewBoardPage.addNewBoard(boardName);

    await t
    .expect(NewBoardPage.boardDdlSelected.withText(boardName).exists).ok(`New Board with name ${boardName} doesn't exist`)
    .expect(NewBoardPage.boardDdl.withText(boardName).exists).ok(`New Board - ${boardName} is not present in the board drop down list`);
});
