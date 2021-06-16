import { Component, OnInit, DoCheck } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { SharedService } from "../shared/shared.service";
import * as fromApp from "../app.reducer";
import * as BoardActions from "./store/board.actions";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit, DoCheck {
  isNew = false;
  id: number;
  editMode: boolean = false;
  editingListIndex: number;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });
  }

  ngDoCheck() {
    this.isNew = this.sharedService.isNew;
    this.editingListIndex = this.sharedService.editingIndex;
  }

  deleteBoard() {
    this.store.dispatch(new BoardActions.DeleteBoard(this.id));
    this.router.navigate(["board"]);
    this.sharedService.isNew = false;
  }

  onNew() {
    this.sharedService.isNew = true;
  }
}
