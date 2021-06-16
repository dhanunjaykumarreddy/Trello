import { Selector } from 'testcafe'; 
import NewBoardPage from '../page-objects/NewBoard.page';
import BoardDetailsPage from '../page-objects/BoardDetails.page';

fixture `Trello Board`
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

test('Verify if user is not able to add new board without name', async t => {
    await t
        .click(NewBoardPage.newBoardBtn)
        .expect(NewBoardPage.addBoardBtn.hasAttribute('disabled')).ok(`Board name is required`);
});

test('Verify if user is able to add a new item to the board', async t => {

    await NewBoardPage.addNewBoard(boardName);

    await BoardDetailsPage.addItem(boardItem1);
    await BoardDetailsPage.saveItem();

    await t
    .expect(BoardDetailsPage.boardItemTitle.withText(boardItem1).exists).ok(`Unable to find newly added item - ${boardItem1}`);
});


test('Verify if user is able to delete the board', async t => {
    await NewBoardPage.addNewBoard(boardName);

    await BoardDetailsPage.deleteBoard(boardName);
    
    await t.expect(NewBoardPage.boardDdl.count).eql(0, `Board deletion failed`);
    await t.expect(NewBoardPage.boardDdl.withText(boardName).exists).notOk(`Board deletion failed`);
});


test('Verify deleting single board when multiple boards exist', async t => {
    await NewBoardPage.addNewBoard(boardName);
    await NewBoardPage.addNewBoard(boardName1);
    await NewBoardPage.addNewBoard(boardName2);

    
    await BoardDetailsPage.deleteBoard(boardName2);
    await t.expect(NewBoardPage.boardDdl.withText(boardName2).exists).notOk(`Board deletion failed`);
    await t.expect(NewBoardPage.boardDdl.withText(boardName).exists).ok(`Board - ${boardName} must be present`);
    await t.expect(NewBoardPage.boardDdl.withText(boardName1).exists).ok(`Board - ${boardName1} must be present`);
});

test('Verify if user is able to add new task to a item in the board', async t => {

    await NewBoardPage.addNewBoard(boardName);

    await BoardDetailsPage.addItem(boardItem1);
    await BoardDetailsPage.addTask(taskName);
    await BoardDetailsPage.addTask(taskName1, 1);
    await BoardDetailsPage.saveItem();
    await t
        .expect(BoardDetailsPage.boardItemTitle.withText(boardItem1).exists).ok(`Add board item - ${boardItem1} failed`)
        .expect(BoardDetailsPage.taskList.withText(taskName).exists).ok(`Add task - ${taskName} failed`)
        .expect(BoardDetailsPage.taskList.withText(taskName1).exists).ok(`Add task - ${taskName1} failed`);
});

test('Verify if user is able to delete a task from the item in the board', async t => {

    await NewBoardPage.addNewBoard(boardName);

    await BoardDetailsPage.addItem(boardItem1);
    await BoardDetailsPage.addTask(taskName);
    await BoardDetailsPage.addTask(taskName1, 1);
    await BoardDetailsPage.removeTask(0);
    await BoardDetailsPage.saveItem();

    await t
        .expect(BoardDetailsPage.boardItemTitle.withText(boardItem1).exists).ok(`Add board item - ${boardItem1} failed`)
        .expect(BoardDetailsPage.taskList.withText(taskName1).exists).ok(`Task - ${taskName1} must be present`)
        .expect(BoardDetailsPage.taskList.count).eql(1, `Task deletion failed`);
});

test('Verify if user is able to add a task without any input', async t => {

    await NewBoardPage.addNewBoard(boardName);

    await BoardDetailsPage.addItem(boardItem1);
    await BoardDetailsPage.addTask(taskName);
    await t.click(BoardDetailsPage.addTaskBtn);
    await BoardDetailsPage.saveItem();

    await t
        .expect(BoardDetailsPage.boardItemTitle.withText(boardItem1).exists).ok(`Add board item - ${boardItem1} failed`)
        .expect(BoardDetailsPage.taskList.withText(taskName).exists).ok(`Task - ${taskName} must be present`)
        .expect(BoardDetailsPage.taskList.nth(1).innerText).notEql("", `Task name cannot be empty`);
});

test('Verify if user is able to remove the item from the board', async t => {

    await NewBoardPage.addNewBoard(boardName);

    await BoardDetailsPage.addItem(boardItem1);
    await BoardDetailsPage.addTask(taskName);
    await BoardDetailsPage.saveItem();
    await BoardDetailsPage.removeItem(boardItem1);

    await t
        .expect(BoardDetailsPage.boardItemTitle.withText(boardItem1).exists).notOk(`Remove item ${boardItem1} failed`);
});


test('Add item should be disabled on empty item title', async t => {
    await NewBoardPage.addNewBoard(boardName);

    await t
        .click(BoardDetailsPage.addBoardItemBtn)
        .expect(BoardDetailsPage.addItemConfirmBtn.hasAttribute('disabled')).ok(`Item title is required`);
});
