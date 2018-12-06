import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component( {
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: [ './file-upload.component.scss' ]
} )
export class FileUploadComponent implements OnInit {

  @Output() imgFile = new EventEmitter();

  imgSrc: any;
  myfile: any;
  constructor() { }

  ngOnInit() {
  }

  imgLoad( data ) {
    console.log( 'image loaded' );
    this.imgFile.emit( data[ 0 ] );
  }

}
