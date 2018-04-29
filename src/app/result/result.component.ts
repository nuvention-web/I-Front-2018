import {AfterContentChecked, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, AfterContentChecked, AfterViewInit, OnChanges {

  // Note:
  // Issue with X-XSS-Protection on youtube video
  // related Gitissue: https://github.com/CookPete/react-player/issues/288
  // See comment by 'phpony'

  isDataLoaded = false;
  public show_purchase = false;
  public card: any;
  public video_URL: string;
  public image_URL: string;
  slideIndex = 1;
  public result_cards = [];
  window_width: number;
  window_height: number;

  constructor(public surService: SurveyResultService) { }

  // modify youtube url string to autoplay at given time without control display
  set_youtube_url(url) {
    console.log(url);
    const re = 'watch?v=';
    url = url.replace(re, 'embed/');
    const processed_url = url + '?start=' + this.card[1].start_time + '&controls=0&autoplay=1&showinfo=0';
    console.log(processed_url);
    return processed_url;
  }

  // profile card carousel
  showSlides(n?) {
    let i;
    const slides = document.getElementsByClassName('slides');
    console.log(slides);
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
      this.slideIndex = 2;
    }

    if (n < 1) {
      this.slideIndex = 1;
    }

    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace('active', '');
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = 'flex';
    (dots[this.slideIndex - 1] as HTMLElement).classList.add('active');

    if (this.slideIndex === this.result_cards.length) {
      this.show_purchase = true;
    }
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  test_func() {
    console.log('test_func called');
    setTimeout(function() { this.show_next_card(); }, 5000);
  }

  goto_purchase() {
    console.log('purchase button clicked');
    window.location.href = 'https://www.tryperf.com/purchase';
  }

  ngOnChanges() {
    console.log('in ngOnChanges');
    // setInterval(this.show_next_card(), 5000);
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
        // this.show_next_card();
        // this.test_func();
      }
      this.card = val;
      console.log(this.card);
      console.log('====' + this.isDataLoaded);

    });
    if (this.card !== undefined) {
      this.result_cards = this.card;
      console.log(this.result_cards);
    }
    this.video_URL = this.set_youtube_url(this.result_cards[this.slideIndex - 1].vid_lnk);
    // this.image_URL = this.result_cards[1].image_lnk;
  }

  ngAfterViewInit() {
    // set backdrop
    document.getElementById('backdrop').style.width = this.window_width.toString() + 'px';
    document.getElementById('backdrop').style.height = this.window_height.toString() + 'px';
    this.showSlides(1);
  }

  ngOnInit() {
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;
  }
}
