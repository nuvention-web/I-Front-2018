import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit} from '@angular/core';
import { ScentProfileCard } from '../../model/profile-card';
import { SurveyResultService } from '../../service/survery-result.service';
import {Subscription} from 'rxjs/Subscription';
import { AsyncPipe } from '@angular/common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit, AfterViewChecked {

  // Note:
  // Issue with X-XSS-Protection on youtube video
  // related Gitissue: https://github.com/CookPete/react-player/issues/288
  // See comment by 'phpony'

  public card: any;
  public video_URL: string;
  public image_URL: string;
  slideIndex: number;
  result_cards = [];

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

  ngAfterViewChecked() {
  }

  ngOnInit() {
    // console.log('profile card init====');
    // this is called twice
    console.log('profile card after content init');
    this.surService._card.subscribe((val) => {
      // this.result_cards.push(val);
      this.card = val;
      console.log(this.card);
    });
    this.result_cards.push(this.card);
    console.log(this.result_cards);
    //
    // one card for testing
    // console.log(this.result_cards);
    // this.card = this.result_cards[0];
    this.video_URL = this.set_youtube_url(this.card.video_url);
    this.image_URL = this.card.profile_img_url;
    // this.video_URL = this.set_youtube_url(url);
  }
}
