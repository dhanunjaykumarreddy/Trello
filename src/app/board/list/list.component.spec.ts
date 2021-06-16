// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

// import { ListComponent } from './list.component';
// import { Store } from '@ngrx/store';
// import { ActivatedRoute } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import * as fromApp from '../../app.reducer';
// import * as BoardActions from '../store/board.actions';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { TestStore } from '../../shared/test-store.model';

// describe('ListComponent', () => {
//   let component: ListComponent;
//   let fixture: ComponentFixture<ListComponent>;
//   let store: TestStore<fromApp.AppState>;
//   let el: HTMLElement;
//   let title: string;
//   let tasks: string[];

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ListComponent ],
//       imports: [RouterTestingModule, DragDropModule],
//       providers: [
//         {
//           provide: Store,
//           useClass: TestStore
//         }
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   beforeEach(inject([Store], (testStore: TestStore<fromApp.AppState>) => {
//     store = testStore;
//     store.setState({
//       board: {
//         boards: []
//       }
//     });
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call onEdit method', async() => {
//     spyOn(component, 'onEdit');
//     component.lists = [{
//       title: '',
//       tasks: []
//     }];
//     fixture.detectChanges();
//     el = fixture.debugElement.nativeElement.querySelector('button');
//     el.click();
//     fixture.whenStable().then(() => {
//       expect(component.onEdit).toHaveBeenCalled();
//     });
//   });

//   it('should call onDelete method', async() => {
//     spyOn(component, 'onDelete');
//     component.lists = [{
//       title: '',
//       tasks: []
//     }];
//     fixture.detectChanges();
//     el = fixture.debugElement.nativeElement.querySelector('button');
//     el.click();
//     fixture.whenStable().then(() => {
//       expect(component.onDelete).toHaveBeenCalled();
//     });
//   });

//   it("should return title and tasks", async () => {
//     store.setState({
//       board: {
//         boards: [{
//             title: "",
//             lists: [{
//                 title: "Test",
//                 tasks: ["Task 1"]
//             }]
//         }]
//       }
//     });

//     fixture.detectChanges();

//     store.select("board").subscribe(state => {
//       title = state.board.boards[0].lists[0].title;
//       tasks = state.board.boards[0].lists[0].tasks;
//     });

//     expect(title).toBe("Test");
//     expect(tasks).toEqual(["Task 1"]);
//   });

//   it('should dispatch delete list', async() => {
//     spyOn(store, 'dispatch');

//     store.setState({
//       board: {
//         boards: [{ title: 'Test', lists: [] }]
//       }
//     });

//     component.lists = [{
//       title: '',
//       tasks: []
//     }];
//     fixture.detectChanges();
//     component.id = 0;
//     el = fixture.debugElement.nativeElement.querySelector('button');
//     el.click();

//     fixture.whenStable().then(() => {
//       expect(store.dispatch).toHaveBeenCalled();
//       expect(store.dispatch).toHaveBeenCalledWith(
//         new BoardActions.DeleteList({
//           boardId: 0,
//           listId: 0
//         })
//       );
//     });
//   });
// });
