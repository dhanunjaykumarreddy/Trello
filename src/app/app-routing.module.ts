import { Routes, RouterModule } from "@angular/router";
import { BoardComponent } from './board/board.component';
import { BoardNewComponent } from './board/board-new/board-new.component';
import { ListComponent } from './board/list/list.component';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/board', pathMatch: 'full' },
  { path: 'board', component: BoardComponent },
  { path: 'board-new', component: BoardNewComponent },
  { path: 'board/:id', component: BoardComponent },
  { path: 'board/:id/lists', component: ListComponent },
  { path: '**', redirectTo: '/board', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
