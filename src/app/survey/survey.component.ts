import {AfterViewInit, Component, OnInit, AfterContentChecked, Renderer2} from '@angular/core';
import { ElementRef } from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, AfterViewInit, AfterContentChecked {
  username  = '';
  public input: any;
  res_one = -1;
  res_two = -1;
  res_three = -1;
  res = [];
  slideIndex = 1;

  // mock quizzes
  // questions
  questions = ['How would you want to spend your vacation?',
              'Who are you at a party?',
              'How do you want others to remember you?',
              'If a time machine was just released, where would you go?',
              'What is your ideal night out?',
              'What is your style?'];

  option_one = ['Enjoying a fruity drink and an ocean breeze', 'Walking through a serene garden in full bloom',
    'Tasting exotic cuisines and decadent desserts', 'Adventuring off the grid and deep into nature'];
  option_two = ['Fly on the wall', 'The life of the party', 'Deep converser', 'Nah, I\'d stay at home'];
  option_three = ['Nice and friendly', 'Intelligent and wise', 'Candid and open', 'Warm and caring'];
  option_four = ['90s', '2000s', '2010s', 'Just stay where I am'];
  option_five = ['Clubbing', 'Kickback', 'Night in', 'Dinner and movie'];
  option_seven = ['Simple and classic', 'Trendy and hipster', 'Casual and comfortable', 'Dress to impress'];
  options = [this.option_one, this.option_two, this.option_three, this.option_four, this.option_five, this.option_seven];

  window_width: number;
  window_height: number;

  constructor(public router: Router,
              public surResult: SurveyResultService,
              private elementRef: ElementRef,
              private render: Renderer2) { }

  register(i) {
    if (this.res[this.slideIndex - 1] !== undefined) {
      console.log('not null');
      this.res[this.slideIndex - 1] = i;
    } else {
      this.res.push(i);
    }

    if (this.res.length >= this.questions.length) {
      this.submit(this.res);
    }
    this.plusSlides(1);
  }

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

  // Next/previous controls
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  to_survey() {
    /*document.getElementById('survey_container').scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });*/
    document.getElementById('customer_info').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  // img src onerror handler
  imgerrorhandler(event, card, type) {
    event.target.src = '../assets/img_survey/cards/1/1.jpg';
    // need to fix
    // event.target.src = '../assets/img_survey/cards/' + `${card}` + '/' + `${type}` + '/' + '.jpg';
  }

  // API call for card
  submit(res) {
    this.surResult.get_card(this.res[0], this.res[1], this.res[2], this.username);
    // this.router.navigate(['resultpage']);
    this.router.navigate(['result']);
  }

  ngAfterViewInit() {
    this.showSlides();
    this.input.addEventListener('keyup', function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById('ok-btn').click();
      }
    });
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  ngAfterContentChecked() {
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;
  }

  ngOnInit() {
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;

    this.input = document.getElementById('user_name');
    // let width = Number(window.innerWidth);
    // let height = window.innerHeight;
    // document.getElementById('survey_container').style.marginBottom = width / 60 + 'rem';

    document.getElementById('logo').scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    const name_container = document.getElementById('name_container');
    const survey_container = document.getElementById('survey_container');

    this.render.setStyle(name_container, 'padding-top', (this.window_height / 4).toString() + 'px' );
    this.render.setStyle(name_container, 'padding-bottom', (this.window_height).toString() + 'px' );
    this.render.setStyle(survey_container, 'padding-top', (this.window_height / 3).toString() + 'px' );
    this.render.setStyle(survey_container, 'padding-bottom', (this.window_height).toString() + 'px' );
  }

}
