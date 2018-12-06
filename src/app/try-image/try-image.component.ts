import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-try-image',
  templateUrl: './try-image.component.html',
  styleUrls: ['./try-image.component.scss']
})
export class TryImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  loadImage(img) {
    console.log('image shown');
    let mat = cv.imread(img);
    cv.imshow('canvasOutput', mat);
    mat.delete();
  }
}
