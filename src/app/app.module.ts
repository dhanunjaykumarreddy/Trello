import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ListComponent } from './board/list/list.component';
import { ListNewComponent } from './board/list/list-new/list-new.component';
import * as fromApp from './app.reducer';
import { BoardComponent } from './board/board.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { BoardNewComponent } from './board/board-new/board-new.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListNewComponent,
    BoardComponent,
    HeaderComponent,
    DropdownDirective,
    BoardNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
