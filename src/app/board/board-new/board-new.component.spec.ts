// import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { StoreModule, Store } from '@ngrx/store';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

// import { BoardNewComponent } from "./board-new.component";
// import { TestStore } from 'src/app/shared/test-store.model';
// import { List } from 'src/app/shared/list.model';
// import * as fromApp from '../../app.reducer';
// import * as BoardActions from '../store/board.actions';

// describe('BoardNewComponent', () => {
//   let component: BoardNewComponent;
//   let fixture: ComponentFixture<BoardNewComponent>;
//   let el: HTMLElement;
//   let store: TestStore<fromApp.AppState>;
//   let title: string;
//   let lists: List[];

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ BoardNewComponent ],
//       imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, StoreModule.forRoot(fromApp.appReducer)],
//       providers: [
//         {
//           provide: Store,
//           useClass: TestStore
//         },
//         {
//           provide: ActivatedRoute,
//           useValue: { params: of({ id: 123 }) }
//         }
//       ],
//       schemas: [NO_ERRORS_SCHEMA]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BoardNewComponent);
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

//   it('should create', async() => {
//     expect(component).toBeTruthy();
//   });

//   it('should call the onSubmit method', async() => {
//     component.boardForm.controls['boardName'].setValue('Test');
//     spyOn(component, 'onSubmit');
//     console.log(component.boardForm.controls['boardName'].valid);
//     el = fixture.debugElement.nativeElement.querySelector('button');
//     console.log(el);
//     el.click();
//     fixture.whenStable().then(() => {
//       fixture.detectChanges();
//       expect(component.onSubmit).toHaveBeenCalled();
//     });
//   });

//   it('should be invalid', async() => {
//     component.boardForm.controls['boardName'].setValue('');
//     expect(component.boardForm.valid).toBeFalsy();
//   });

//   it('should be valid', async() => {
//     component.boardForm.controls['boardName'].setValue('Test');
//     expect(component.boardForm.valid).toBeTruthy();
//   });

//   it('should return title and lists', async() => {
//     store.setState({
//       board: {
//         boards: [{
//             title: 'Test',
//             lists: [{
//               title: 'List 1',
//               tasks: []
//             }]
//         }]
//       }
//     });

//     fixture.detectChanges();

//     store.select('board').subscribe(state => {
//       title = state.board.boards[0].title;
//       lists= state.board.boards[0].lists;
//     });

//     expect(title).toBe('Test');
//     expect(lists).toEqual([{ title: 'List 1', tasks: [] }]);
//   });

//   it('should dispatch add board', async() => {
//     spyOn(store, 'dispatch');

//     store.setState({ board: { boards: [] } });
//     fixture.detectChanges();

//     component.boardForm.controls['boardName'].setValue('Test');
//     el = fixture.debugElement.nativeElement.querySelector('button');
//     el.click();

//     fixture.whenStable().then(() => {
//       expect(store.dispatch).toHaveBeenCalled();
//       expect(store.dispatch).toHaveBeenCalledWith(
//         new BoardActions.AddBoard({ title: 'Test', lists: [] })
//       );
//     });
//   });
// });
