import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, forkJoin, BehaviorSubject, fromEvent, } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { OpenCVLoadResult, NgOpenCVService, } from 'ng-open-cv';

@Component( {
  selector: 'app-try-image',
  templateUrl: './try-image.component.html',
  styleUrls: [ './try-image.component.scss' ]
} )
export class TryImageComponent implements OnInit, AfterViewInit {
  // Keep tracks of the ready
  openCVLoadResult: Observable<OpenCVLoadResult>;
  private classifiersLoaded = new BehaviorSubject<boolean>( false );
  classifiersLoaded$ = this.classifiersLoaded.asObservable();


  @ViewChild( 'outImg' ) outImg: ElementRef;

  constructor(
    private ngOpenCVService: NgOpenCVService
  ) { }

  ngOnInit() {
    this.openCVLoadResult = this.ngOpenCVService.isReady$;

  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.ngOpenCVService.isReady$.pipe(
      // The OpenCV library has been successfully loaded if result.ready === true
      filter( ( result: OpenCVLoadResult ) => result.ready ),
      switchMap( () => {
        // Load the face and eye classifiers files
        return this.loadClassifiers();
      } )
    )
      .subscribe( () => {
        // The classifiers have been succesfully loaded
        this.classifiersLoaded.next( true );
      } );
  }

  loadImage( img ) {
    console.log( 'image shown' );
    const reader = new FileReader();
    const load$ = fromEvent( reader, 'load' );
    load$
      .pipe(
        switchMap( () => {
          return this.ngOpenCVService.loadImageToHTMLCanvas( `${ reader.result }`, this.outImg.nativeElement );
        } )
      )
      .subscribe(
        () => { },
        err => {
          console.log( 'Error loading image', err );
        }
      );
    reader.readAsDataURL( img.files[ 0 ] );

    // const src = cv.imread(img.files[0]);
    // cv.imshow(this.outImg.nativeElement, src);
  }

  loadClassifiers(): Observable<any> {
    return forkJoin(
      this.ngOpenCVService.createFileFromUrl(
        'haarcascade_frontalface_default.xml',
        `assets/opencv/data/haarcascades/haarcascade_frontalface_default.xml`
      ),
      this.ngOpenCVService.createFileFromUrl(
        'haarcascade_eye.xml',
        `assets/opencv/data/haarcascades/haarcascade_eye.xml`
      )
    );
  }

  opencvLoaded() {
    let isLoaded: boolean;
    this.ngOpenCVService.isReady$
      .pipe(
        filter( ( result: OpenCVLoadResult ) => result.ready ),
        switchMap( () => {
          return this.classifiersLoaded$;
        } ),
      )
      .subscribe( () => {
        isLoaded = true;
      }, err => {
        console.log( 'opencv not loaded' );
        isLoaded = false;
      } );
      return isLoaded;
  }

  findFaceAndEyes() {
    if ( this.opencvLoaded() ) {
      // Example code from OpenCV.js to perform face and eyes detection
      // Slight adapted for Angular
      const src = cv.imread( this.outImg.nativeElement.id );
      const gray = new cv.Mat();
      cv.cvtColor( src, gray, cv.COLOR_RGBA2GRAY, 0 );
      const faces = new cv.RectVector();
      const eyes = new cv.RectVector();
      const faceCascade = new cv.CascadeClassifier();
      const eyeCascade = new cv.CascadeClassifier();
      // load pre-trained classifiers, they should be in memory now
      faceCascade.load( 'haarcascade_frontalface_default.xml' );
      eyeCascade.load( 'haarcascade_eye.xml' );
      // detect faces
      const msize = new cv.Size( 0, 0 );
      faceCascade.detectMultiScale( gray, faces, 1.1, 3, 0, msize, msize );
      for ( let i = 0; i < faces.size(); ++i ) {
        const roiGray = gray.roi( faces.get( i ) );
        const roiSrc = src.roi( faces.get( i ) );
        const point1 = new cv.Point( faces.get( i ).x, faces.get( i ).y );
        const point2 = new cv.Point( faces.get( i ).x + faces.get( i ).width, faces.get( i ).y + faces.get( i ).height );
        cv.rectangle( src, point1, point2, [ 255, 0, 0, 255 ] );
        // detect eyes in face ROI
        eyeCascade.detectMultiScale( roiGray, eyes );
        for ( let j = 0; j < eyes.size(); ++j ) {
          const point3 = new cv.Point( eyes.get( j ).x, eyes.get( j ).y );
          const point4 = new cv.Point( eyes.get( j ).x + eyes.get( j ).width, eyes.get( j ).y + eyes.get( j ).height );
          cv.rectangle( roiSrc, point3, point4, [ 0, 0, 255, 255 ] );
        }
        roiGray.delete();
        roiSrc.delete();
      }
      cv.imshow( this.outImg.nativeElement.id, src );
      src.delete();
      gray.delete();
      faceCascade.delete();
      eyeCascade.delete();
      faces.delete();
      eyes.delete();
    } else {
      alert('OpenCV not loaded');
    }
  }
}
