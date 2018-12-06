import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { TryImageComponent } from './try-image.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TryImageComponent,
    children: [ ]
  }
];

@NgModule({
  declarations: [
    TryImageComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    SharedModule
  ]
})
export class TryImageModule { }
