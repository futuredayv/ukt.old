import { Component, OnInit, OnDestroy } from '@angular/core';

import homeEnterAnimation from '../Animations/home.enter.animation';

import { Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { AppService } from '../app.service';

@Component({
  selector: 'ukt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [homeEnterAnimation]
})
export class HomeComponent implements OnInit, OnDestroy {

  slides: Slide[] = [
    {
      heading: 'Fabrics',
      desc: 'Lorem ipsum dolor sit amet...',
      img: '../assets/acar-carousel/fabrics.jpg',
      button: 'İncele'
    },
    {
      heading: 'Auxiliaries',
      desc: 'Lorem ipsum dolor sit amet...',
      img: '../assets/acar-carousel/auxiliaries.jpg',
      button: 'İncele'
    },
    {
      heading: 'Color Cotton',
      desc: 'Lorem ipsum dolor sit amet...',
      img: '../assets/acar-carousel/colorcotton.jpg',
      button: 'İncele'
    },
    {
      heading: 'Color Chemistry',
      desc: 'Lorem ipsum dolor sit amet...',
      img: '../assets/acar-carousel/colors.jpg',
      button: 'İncele'
    }
  ];

  loadedCount = 0;
  ready = false;

  sub: Subscription;


  constructor( private _appService: AppService ) { }

  ngOnInit() {
    this.sub = this._appService.ui
      .pipe(debounceTime(100))
      .subscribe(state => {
        console.log(`[HOME] isBusy: ${state.isBusy}`);
        this.ready = !state.isBusy;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get isLoaded() {
    return this.loadedCount === this.slides.length;
  }

  get isReady() {
    return this.isLoaded && this.ready;
  }

  imageLoaded() {
    this.loadedCount += 1;
  }

}

interface Slide {
  heading: string;
  desc: string;
  button?: string;
  img: string;
}
