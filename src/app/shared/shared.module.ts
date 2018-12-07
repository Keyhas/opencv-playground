import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import { OpenCVOptions } from 'ng-open-cv/public_api';
import { NgOpenCVModule } from 'ng-open-cv';



const openCVConfig: OpenCVOptions = {
  scriptUrl: `../../assets/opencv/opencv.js`,
  wasmBinaryFile: '../../assets/opencv/wasm/opencv_js.wasm',
  usingWasm: true
};
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgOpenCVModule.forRoot(openCVConfig),
    ButtonModule,
    FileUploadModule,
  ],
  exports: [
    ButtonModule,
    NgOpenCVModule,
    FileUploadModule,
  ]
})
export class SharedModule { }
