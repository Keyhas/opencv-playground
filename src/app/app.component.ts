import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  title = 'opencv-playground';

  loadImages(){
    console.log('loading images module');
    this.router.navigate(['/images']);
  }

}
