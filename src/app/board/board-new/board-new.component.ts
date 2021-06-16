import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import * as BoardActions from "../store/board.actions";
import * as fromApp from "../../app.reducer";
import { Board } from "src/app/shared/board.model";
import { State } from '../store/board.reducer';

@Component({
  selector: "app-board-new",
  templateUrl: "./board-new.component.html",
  styleUrls: ["./board-new.component.css"]
})
export class BoardNewComponent implements OnInit, OnDestroy {
  board: Board;
  boards: Board[];
  subscription: Subscription;
  id: number;
  boardForm: FormGroup;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("board")
      .subscribe((state: State) => {
        this.boards = state.boards;
      });

    this.boardForm = new FormGroup({
      boardName: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.board = new Board(this.boardForm.value.boardName, []);
    this.store.dispatch(new BoardActions.AddBoard(this.board));
    this.id = this.boards.length - 1;
    this.router.navigate(["../board", this.id], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
