import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormArray, FormControl, FormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ListNewComponent } from './list-new.component';
import * as fromApp from "../../../app.reducer";
import * as BoardActions from '../../store/board.actions';
import { appReducer } from '../../../app.reducer';
import { TestStore } from '../../../shared/test-store.model';
import { AppRoutingModule, appRoutes } from '../../../app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListNewComponent', () => {
  let component: ListNewComponent;
  let fixture: ComponentFixture<ListNewComponent>;
  let el: HTMLElement;
  let store: TestStore<fromApp.AppState>;
  let title: string;
  let tasks: string[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNewComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, StoreModule.forRoot(appReducer)],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {params: of({id: 123})}
        },
        {
          provide: Store,
          useClass: TestStore
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewComponent);
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

  it('should call the onSubmit method', async()=> {
    component.listForm.controls['title'].setValue('Test');
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  });

  it('should be invalid', async() => {
    component.listForm.controls['title'].setValue('');
    expect(component.listForm.valid).toBeFalsy();
  });

  it('should be valid', async() => {
    component.listForm.controls['title'].setValue('Test');
    expect(component.listForm.valid).toBeTruthy();
  });

  it('should add task', async() => {
    spyOn(component, 'onAddTask');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();
    fixture.whenStable().then(() => {
      expect(component.onAddTask).toHaveBeenCalled();
    });
  });

  it('should remove task', async() => {
    (<FormArray>component.listForm.get("tasks")).push(new FormControl(null));
    spyOn(component, 'onRemoveTask');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();
    fixture.whenStable().then(() => {
      expect(component.onRemoveTask).toHaveBeenCalled();
    });
  });

  it('should call the onCancel method', async() => {
    spyOn(component, 'onCancel');
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();
    fixture.whenStable().then(() => {
      expect(component.onCancel).toHaveBeenCalled();
    });
  });

  it('should return title and tasks', async() => {
    store.setState({
      board: {
        boards: [{
            title: '',
            lists: [{
              title: 'Test',
              tasks: ['Task 1']
            }]
        }]
      }
    });

    fixture.detectChanges();

    store.select('board').subscribe(state => {
      title = state.board.boards[0].lists[0].title;
      tasks = state.board.boards[0].lists[0].tasks;
    });

    expect(title).toBe('Test');
    expect(tasks).toEqual(['Task 1']);
  });

  it('should dispatch add and update list', async() => {
    spyOn(store, 'dispatch');

    store.setState({
      board: {
        boards: [{ title: 'Test', lists: [] }]
      }
    });
    fixture.detectChanges();

    component.listForm.controls['title'].setValue('List 1');
    (<FormArray>component.listForm.get("tasks")).push(new FormControl('Task 1'));
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();

    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new BoardActions.AddList({
          boardId: 0,
          newList: {
            title: "List 1",
            tasks: ["Task 1"]
          }
        })
      );
    });

    component.editingListIndex = 0;
    component.listForm.controls['title'].setValue('List 1');
    (<FormArray>component.listForm.get("tasks")).push(new FormControl('Task 1'));
    el = fixture.debugElement.nativeElement.querySelector('button');
    el.click();

    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new BoardActions.UpdateList({
          boardId: 0,
          listId: 0,
          updatedList: {
            title: 'List 1',
            tasks: ['Task 1']
          }
        })
      );
    });

  });
});
