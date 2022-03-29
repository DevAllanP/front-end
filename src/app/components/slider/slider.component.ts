import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import DataJson from 'src/assets/jsonfixtures/data.json';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slidesImages: String[] = [];

  constructor(private router: Router ) {
    this.slidesImages.push(...DataJson.data.slides);
   }

  ngOnInit(): void {
    //this.slidesImages.push(...DataJson.data.slides);
  }

  ngAfterViewInit() {
    if(this.isHomeRoute()) {
      this.reloadCurrentRoute();
    }
  }

  isHomeRoute() {
    return this.router.url === '/' || '';
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.ngOnInit();
    })
  }
}
