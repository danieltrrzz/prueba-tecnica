// Plantilla
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './pipes/date.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DatePipe
  ],
  exports: [
    DatePipe
  ]
})
export class SharedModule { }
