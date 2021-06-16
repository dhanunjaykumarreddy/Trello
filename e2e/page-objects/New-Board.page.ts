import { Selector, t } from 'testcafe';

class NewBoardPage {
    boardNameTextBox: Selector;
    newBoardBtn: Selector;
    addBoardBtn: Selector;
    boardDdlSelected: Selector;
    boardDdl: Selector;

    constructor () {
        this.newBoardBtn = Selector('.navbar-brand').with({visibilityCheck: true}).withExactText("New Board");
        this.boardNameTextBox = Selector('#boardName');
        this.addBoardBtn = Selector("button.btn-success").with({visibilityCheck: true}).withExactText("Add Board");
        this.boardDdlSelected = Selector(".navbar-header a a span");
        this.boardDdl = Selector(".dropdown-menu li a");
    }

    async addNewBoard(name: string) {
        await t
            .click(this.newBoardBtn)
            .typeText(this.boardNameTextBox, name)
            .click(this.addBoardBtn);
    }
}

export default new NewBoardPage();