import { Selector, t } from 'testcafe';

class BoardDetailsPage {
    addBoardItemBtn: Selector;
    titleTextBox: Selector;
    addItemConfirmBtn: Selector;
    deleteBoardBtn: Selector;
    taskTextBox: Selector;
    addItemSaveBtn: Selector;
    addTaskBtn: Selector;
    task: Selector;
    boardItemTitle: Selector;
    taskList: Selector;


    constructor () {
        this.addBoardItemBtn = Selector("button.btn-success").withExactText("New Item");
        this.titleTextBox = Selector("#title");
        this.addItemConfirmBtn = Selector("button.btn-success").withExactText("Add Item");
        this.deleteBoardBtn = Selector("button.btn-danger").withExactText("Delete Current Board");
        this.addItemSaveBtn = Selector("button.btn-success").withExactText("Save");
        this.addTaskBtn = Selector("button.btn-info").withExactText("Add Task");
        this.boardItemTitle = Selector("div.panel").find('h3');
        this.taskList = Selector("ul.list-group").find('li');
    }

    async addItem(title: string) {
        await t
            .click(this.addBoardItemBtn)
            .typeText(this.titleTextBox, title)
    }

    async removeItem(itemName: string) {
        let deleteBtn = Selector("div.panel").find('div h3').withText(itemName).parent().sibling(1).child("button.btn-danger").withText("Delete");
        await t
            .click(deleteBtn)
    }

    async saveItem() {
        await t
            .click(this.addItemConfirmBtn);
    }

    async deleteBoard(boardName) {
        await t
            .click(Selector("a.dropdown a span").withText(boardName))
            .click(this.deleteBoardBtn);
    }

    async addTask(taskName: string, taskNumber:number=0) {
        this.taskTextBox = Selector("#task[ng-reflect-name='" + taskNumber + "']");
        await t
            .click(this.addTaskBtn)
            .typeText(this.taskTextBox, taskName)
    }

    async removeTask(taskNum: number) {
        let task = Selector('div[formarrayname="tasks"]').child(taskNum).find("button.btn-danger");
        await t
            .click(task);
    }
}

export default new BoardDetailsPage();