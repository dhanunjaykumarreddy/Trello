// import { HeaderComponent } from "./header.component";
// import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
// import { TestStore } from '../shared/test-store.model';

// import * as fromApp from '../app.reducer';
// import { RouterTestingModule } from '@angular/router/testing';
// import { StoreModule, Store } from '@ngrx/store';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
// import { By } from '@angular/platform-browser';

// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//   let el: HTMLElement;
//   let de: DebugElement;
//   let store: TestStore<fromApp.AppState>;
//   let title: string;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ HeaderComponent ],
//       imports: [RouterTestingModule, StoreModule.forRoot(fromApp.appReducer)],
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
//     fixture = TestBed.createComponent(HeaderComponent);
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

//   it('should call the routeTo method', async() => {
//     spyOn(component, 'routeTo');
//     de = fixture.debugElement.query(By.css('a'));
//     de.triggerEventHandler('click', {});
//     fixture.detectChanges();
//     expect(component.routeTo).toHaveBeenCalled();
//   });

//   it('should call the routeTo method', async() => {
//     spyOn(component, 'routeTo');
//     de = fixture.debugElement.query(By.css('a'));
//     de.triggerEventHandler('click', {});
//     fixture.detectChanges();
//     expect(component.routeTo).toHaveBeenCalled();
//   });

//   it('should return title', async() => {
//     store.setState({ board: { boards: [{ title: 'Test', lists: [] }] } });
//     fixture.detectChanges();
//     store.select('board').subscribe(state => {
//       title = state.board.boards[0].title;
//     });
//     expect(title).toBe('Test');
//   });
// });
