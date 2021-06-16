import { Component, OnInit, OnDestroy, DoCheck } from "@angular/core";
import { FormArray, FormGroup, FormControl, Validators } from "@angular/forms";
import { List } from "src/app/shared/list.model";
import { Subscription, Observable } from "rxjs";
import { Store, State, select } from "@ngrx/store";
import { ActivatedRoute, Params } from "@angular/router";
import { map } from 'rxjs/operators';

import * as fromApp from "../../../app.reducer";
import * as fromBoard from '../../store/board.reducer';
import * as BoardActions from "../../../board/store/board.actions";
import { Board } from "src/app/shared/board.model";
import { SharedService } from "src/app/shared/shared.service";

@Component({
  selector: "app-list-new",
  templateUrl: "./list-new.component.html",
  styleUrls: ["./list-new.component.css"]
})
export class ListNewComponent implements OnInit, OnDestroy {
  listForm: FormGroup;
  boardSub: Subscription;
  lists: List[];
  boards: Board[];
  id: number;
  editingListIndex: number;
  state: Observable<any>;

  get tasksControls() {
    return (this.listForm.get("tasks") as FormArray).controls;
  }

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });

    this.boardSub = this.store
      .select('board')
      .subscribe(state => {
        this.boards = state.boards;
        console.log(state);
        this.lists = this.boards[this.id].lists;
      });

    this.editingListIndex = this.sharedService.editingIndex;

    if (!(this.editingListIndex >= 0)) {
      let tasks = new FormArray([]);

      this.listForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        tasks: tasks
      });
    } else {
      let tasks = this.lists[this.editingListIndex].tasks;
      let title = this.lists[this.editingListIndex].title;

      let listTasks = new FormArray([]);

      for (let task of tasks) {
        listTasks.push(new FormControl(task));
      }

      this.listForm = new FormGroup({
        title: new FormControl(title, Validators.required),
        tasks: listTasks
      });
    }
  }

  onSubmit() {
    if (!(this.editingListIndex >= 0)) {
      this.store.dispatch(
        new BoardActions.AddList({
          boardId: this.id,
          newList: this.listForm.value
        })
      );
    } else {
      this.store.dispatch(
        new BoardActions.UpdateList({
          boardId: this.id,
          listId: this.editingListIndex,
          updatedList: this.listForm.value
        })
      );
    }
    this.listForm.reset();
    this.sharedService.isNew = false;
    this.sharedService.editingIndex = -1;
    this.editingListIndex = this.sharedService.editingIndex;
  }

  onAddTask() {
    (<FormArray>this.listForm.get("tasks")).push(new FormControl(null));
  }

  onRemoveTask(index: number) {
    (<FormArray>this.listForm.get("tasks")).removeAt(index);
  }

  onCancel() {
    this.sharedService.isNew = false;
    if (this.editingListIndex >= 0) {
      this.sharedService.editingIndex = -1;
      this.editingListIndex = this.sharedService.editingIndex;
    }
  }

  ngOnDestroy() {
    this.boardSub.unsubscribe();
  }
}
