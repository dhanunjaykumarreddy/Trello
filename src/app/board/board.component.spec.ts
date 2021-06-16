import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BoardComponent } from "./board.component";
import { TestStore } from 'src/app/shared/test-store.model';
import { List } from 'src/app/shared/list.model';
import * as fromApp from '../app.reducer';
import * as BoardActions from './store/board.actions';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let el: HTMLElement;
  let store: TestStore<fromApp.AppState>;
  let title: string;
  let lists: List[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      imports: [RouterTestingModule.withRoutes([{ path: 'board', component: BoardComponent }]), StoreModule.forRoot(fromApp.appReducer)],
      providers: [
        {
          provide: Store,
          useClass: TestStore
        },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 123 }) }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (testStore: TestStore<fromApp.AppState>) => {
    store = testStore;
    store.setState({
      board: {
        boards: []
      }
    });
  }));

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  it('should call the onNew method', async() => {
    spyOn(component, 'onNew');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();
    fixture.detectChanges();
    expect(component.onNew).toHaveBeenCalled();
  });

  it('should call the deleteBoard method', async() => {
    spyOn(component, 'deleteBoard');
    el = fixture.debugElement.nativeElement.querySelector('button.btn.btn-danger.pull-right');
    el.click();
    fixture.detectChanges();
    expect(component.deleteBoard).toHaveBeenCalled();
  });

  it('should return title and lists', async() => {
    store.setState({
      board: {
        boards: [{
            title: 'Test',
            lists: [{
              title: 'List 1',
              tasks: []
            }]
        }]
      }
    });

    fixture.detectChanges();

    store.select('board').subscribe(state => {
      title = state.board.boards[0].title;
      lists= state.board.boards[0].lists;
    });

    expect(title).toBe('Test');
    expect(lists).toEqual([{ title: 'List 1', tasks: [] }]);
  });

  it('should dispatch delete board', async() => {
    spyOn(store, 'dispatch');

    store.setState({ board: { boards: [{ title: '', lists: [] }] } });
    fixture.detectChanges();

    el = fixture.debugElement.nativeElement.querySelector('button.btn.btn-danger.pull-right');
    el.click();

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new BoardActions.DeleteBoard(123)
    );
  });
});
