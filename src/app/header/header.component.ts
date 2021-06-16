import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Router, Params, ActivatedRoute } from "@angular/router";

import { Board } from "../shared/board.model";
import * as fromApp from "../app.reducer";
import { State } from '../board/store/board.reducer';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  boards: Board[];
  subscription: Subscription;
  id: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });

    this.subscription = this.store
      .select("board")
      .subscribe((state: State) => {
        this.boards = state.boards;
      });

    if (this.id > this.boards.length - 1) {
      this.router.navigate(["board"]);
    }
  }

  routeTo(id: number) {
    this.router.navigate(["board", id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
