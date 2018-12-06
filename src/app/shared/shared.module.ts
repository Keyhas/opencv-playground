import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    FileUploadModule,
  ],
  exports: [
    ButtonModule,
    FileUploadModule,
  ]
})
export class SharedModule { }
