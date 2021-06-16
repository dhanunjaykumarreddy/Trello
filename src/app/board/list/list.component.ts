import { Component, OnInit, OnDestroy, DoCheck } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";

import * as fromApp from "../../app.reducer";
import * as BoardActions from "../store/board.actions";
import { Board } from "../../shared/board.model";
import { List } from "../../shared/list.model";
import { SharedService } from "src/app/shared/shared.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit, OnDestroy, DoCheck {
  boards: Board[];
  subscription: Subscription;
  lists: List[];
  tasks: string[];
  id: number;
  editingListIndex: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });

    this.subscription = this.store
      .select("board")
      .subscribe(state => {
        this.boards = state.boards;
        if (this.id >= 0) {
          this.lists = this.boards[this.id].lists;
        }
        this.editingListIndex = this.sharedService.editingIndex;
      });
  }

  ngDoCheck() {
    this.editingListIndex = this.sharedService.editingIndex;
  }

  onDelete(index: number) {
    this.store.dispatch(
      new BoardActions.DeleteList({
        boardId: this.id,
        listId: index
      })
    );
  }

  onEdit(index: number) {
    this.sharedService.editingIndex = index;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
