import {AfterContentChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, AfterContentChecked, AfterViewInit {

  // Note:
  // Issue with X-XSS-Protection on youtube video
  // related Gitissue: https://github.com/CookPete/react-player/issues/288
  // See comment by 'phpony'

  isDataLoaded = false;
  public card: any;
  public video_URL: string;
  public image_URL: string;
  slideIndex: number;
  result_cards = [];
  window_width: number;
  window_height: number;

  constructor(public surService: SurveyResultService) { }

  // modify youtube url string to autoplay at given time without control display
  set_youtube_url(url) {
    const re = 'watch?v=';
    url = url.replace(re, 'embed/');
    const processed_url = url + '?start=' + this.card.start_time + '&controls=0&autoplay=1&showinfo=0';
    return processed_url;
  }

  // profile card carousel
  showSlides(n?) {
    let i;
    const slides = document.getElementsByClassName('slides');
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace('active', '');
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = 'block';
    (dots[this.slideIndex - 1] as HTMLElement).classList.add('active');
  }

  // when a scent profile card is made
  // get the profile card from the service onInit
  // ngAfterContentChecked()

  ngAfterContentChecked() {
    // console.log('profile card init====');
    console.log('result page oninit');
    this.surService._card.subscribe((val) => {
      if (val) {
        this.isDataLoaded = true;
      }
      this.card = val;
      console.log(this.card);
      console.log('====' + this.isDataLoaded);

    });
    if (this.card !== undefined) {
      this.result_cards.push(this.card);
    }
    console.log(this.result_cards);
    //
    // one card for testing
    // console.log(this.result_cards);
    // this.card = this.result_cards[0];
    this.video_URL = this.set_youtube_url(this.card.video_url);
    this.image_URL = this.card.profile_img_url;
    // this.video_URL = this.set_youtube_url(url);
  }

  ngAfterViewInit() {
    // set backdrop
    document.getElementById('backdrop').style.width = this.window_width.toString() + 'px';
    document.getElementById('backdrop').style.height = this.window_height.toString() + 'px';
  }

  ngOnInit() {
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;
    console.log(this.window_height);
    console.log(this.window_width);
  }
}
