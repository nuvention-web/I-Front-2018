import {AfterContentChecked, AfterViewInit, Component, OnChanges, OnInit, Renderer2, ElementRef} from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';
import { ResponseForm } from '../model/response-form';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, AfterContentChecked, AfterViewInit, OnChanges {
  userEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  private input: any;
  isDataLoaded = false;
  button_checker = [false, false, false];
  public show_purchase = false;
  public card: any;
  public result_cards = [];
  window_width: number;
  window_height: number;
  public name: string;

  constructor(public surService: SurveyResultService,
              public render: Renderer2,
              public el: ElementRef,
              public http: HttpClient,
              private fb: FacebookService) {
                const initParams: InitParams = {
                  appId: '1702384233188262',
                  xfbml: true,
                  version: 'v2.8'
                };
        fb.init(initParams);
  }

  // modify youtube url string to autoplay at given time without control display
  set_youtube_url(url) {
    console.log(url);
    const re = 'watch?v=';
    url = url.replace(re, 'embed/');
    const processed_url = url + '?start=' + this.card[1].start_time + '&controls=0&autoplay=1&showinfo=0';
    return processed_url;
  }

  getErrorMessage() {
    return this.userEmail.hasError('required') ? 'You must enter an email' :
      this.userEmail.hasError('email') ? 'Not a valid email' :
        '';
  }

  goto_purchase() {
    if (!this.userEmail.hasError('email')) {
      this.surService.send_result(this.result_cards, this.userEmail.value);
    } else {
      document.getElementById('email_area').focus();
    }
  }

  toThirdPage() {
    const distill_first = document.getElementById('distill_first');
    const item_display = document.getElementById('item_display');
    distill_first.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setTimeout(function() {
      distill_first.style.opacity = '0';
      item_display.style.opacity = '1';
    }, 2500);
  }

  fireEvent(e, i: number) {
    document.getElementById('hr_' + i).style.opacity = '0';
    document.getElementById('card_name_' + i).style.opacity = '0';
    document.getElementById('card_name_' + i).innerHTML = '';
    document.getElementById('card_desc_' + i).style.opacity = '1';
    document.getElementById('card_desc_' + i).innerHTML = this.result_cards[i].description.split('/')[0];
    document.getElementById('card_desc_italicize_' + i).style.opacity = '1';
    document.getElementById('card_desc_italicize_' + i).innerHTML = this.result_cards[i].description.split('/')[1];
    this.button_checker[i] = true;
  }

  killEvent(e, i: number) {
    document.getElementById('hr_' + i).style.opacity = '1';
    document.getElementById('card_name_' + i).style.opacity = '1';
    document.getElementById('card_name_' + i).innerHTML = this.result_cards[i].name;
    document.getElementById('card_desc_' + i).style.opacity = '0';
    document.getElementById('card_desc_' + i).innerHTML = '';
    document.getElementById('card_desc_italicize_' + i).style.opacity = '0';
    document.getElementById('card_desc_italicize_' + i).innerHTML = '';
  }

  scroll_to(div: string) {
    const target_div = document.getElementById(div);
    target_div.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  fbShare() {
    console.log('facebook share button');
    const params: UIParams = {
      // method: 'share',
      // action_type: 'og.likes',
      // action_properties: JSON.stringify({
      //   object: 'https://www.tryperf.com',
      // })

      method: 'share_open_graph',
              action_type: 'og.shares',
              action_properties: JSON.stringify({
                object : {
                  'og:url': 'https://www.tryperf.com', // your url to share
                  'og:title': 'perf - Find your personalized scent today!', // this is the segment that goes on FB
                  'og:description': 'I am '
                                    +  `${this.result_cards[0].name}` + ', '
                                    +  `${this.result_cards[1].name}` + ', and '
                                    +  `${this.result_cards[2].name}` + '.'
                                    + ' Who are you?',
                  'og:image:url': 'https://s3.amazonaws.com/survey.tryperf.com/assets/img_survey_host/root/logo_smaller.png',
                  'og:image:width': '300',
                  'og:image:height': '100',
                }
              })
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));

    // FB.ui({
    //   display: 'popup',
    //   method: 'share',
    //   href: 'https://developers.facebook.com/docs/',
    // }, function(response){});
  }

  ngOnChanges() {
  }

  // when a scent profile card is made
  // get the profile card from the service onInit
  // ngAfterContentChecked()
  ngAfterContentChecked() {
    this.input = document.getElementById('email_area');

    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;

    // console.log('result page oninit');
    this.surService._card.subscribe((val) => {
      if (val) {
        this.isDataLoaded = true;
        this.card = val;
      }
    });

    // if (this.card === undefined) {
    //   this.card = this.http.get('../../assests/dummycard.json');
    // }
    if (this.card !== undefined) {
      this.result_cards = this.card;

      const cards = document.getElementsByClassName('cards');
      let i = 0;
      for (i = 0; i < cards.length; i++) {
        (cards[i] as HTMLElement).style.backgroundImage = this.result_cards[i].image_lnk;
      }

      const texts = document.getElementsByClassName('text_intro');
      let j = 0;
      for (j = 0; j < texts.length; j++) {
        (texts[j] as HTMLElement).style.opacity = '1';
      }
    }

    //// hidden button display
    if (this.button_checker[0] && this.button_checker[1] && this.button_checker[2]) {
      const make_btns = document.getElementsByClassName('arrow_wrapper');
      (make_btns[1] as HTMLElement).style.opacity = '1';
    }
  }

  ngAfterViewInit() {
    setTimeout(function() {
      const target_div = document.getElementById('row_cards');
      target_div.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 4000);

    this.input.addEventListener('keyup', function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById('purchase_btn').click();
      }
    });
  }

  ngOnInit() {
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;


    this.name = this.surService.get_username();

    const first_page = document.getElementById('first_page');
    const first_page_text = document.getElementById('first_page_text')
    const second_page = document.getElementById('second_page');
    const third_page = document.getElementById('third_page');
    first_page_text.style.opacity = '1';
    first_page.scrollIntoView();

    this.render.setStyle(first_page, 'padding-top', (this.window_height / 3).toString() + 'px' );
    this.render.setStyle(first_page, 'padding-bottom', (this.window_height).toString() + 'px' );
    this.render.setStyle(third_page, 'padding-top', (this.window_height / 3).toString() + 'px' );
    this.render.setStyle(third_page, 'padding-bottom', (this.window_height).toString() + 'px' );
    this.render.setStyle(second_page, 'padding-top', (this.window_height / 5).toString() + 'px' );
    this.render.setStyle(second_page, 'padding-bottom', (this.window_height / 2).toString() + 'px' );
  }
}
