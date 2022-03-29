import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    ArticleComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ArticleComponent,
    ModalComponent
  ]
})
export class SharedModule { }
