import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from './app-routing.module';
import { BoardComponent } from './board/board.component';
import { BoardNewComponent } from './board/board-new/board-new.component';
import { ListComponent } from './board/list/list.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListNewComponent } from './board/list/list-new/list-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './app.reducer';
import { TestStore } from './shared/test-store.model';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let store: TestStore<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes), ReactiveFormsModule, DragDropModule, StoreModule.forRoot(fromApp.appReducer)],
      declarations: [
        BoardComponent,
        BoardNewComponent,
        ListComponent,
        HeaderComponent,
        ListNewComponent,
        AppComponent
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navigate to "" redirects you to /board', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/board');
  }));

  it('navigate to "board" takes you to /board', fakeAsync(() => {
    router.navigate(['board']);
    tick();
    expect(location.path()).toBe('/board');
  }));

  it('navigate to "board-new" takes you to /board-new', fakeAsync(() => {
    router.navigate(['board-new']);
    tick();
    expect(location.path()).toBe('/board-new');
  }));

  it('navigate to "board/0" takes you to /board/0', fakeAsync(() => {
    router.navigate(['board/0']);
    tick();
    expect(location.path()).toBe('/board/0');
  }));

  it('navigate to "board/0/lists" takes you to /board/0/lists', fakeAsync(() => {
    router.navigate(['board/0/lists']);
    tick();
    expect(location.path()).toBe('/board/0/lists');
  }));

  it('navigate to "**" takes you to /board', fakeAsync(() => {
    router.navigate(['**']);
    tick();
    expect(location.path()).toBe('/board');
  }));
});
