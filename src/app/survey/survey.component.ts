import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ElementRef } from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';
import { ResponseForm } from '../model/response-form';

import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, AfterViewInit {
  res_one = -1;
  res_two = -1;
  res_three = -1;
  res = [];
  slideIndex = 1;

  // mock quizzes
  // questions
  questions = ['How would you want to spend your vacation?',
              'Who are you at a party?',
              'How do you want others to remember you?'];

  option_one = ['Enjoying a fruity drink and an ocean breeze', 'Walking through a serene garden in full bloom',
    'Tasting exotic cuisines and decadent desserts', 'Adventuring off the grid and deep into nature'];
  option_two = ['Fly on the wall', 'The life of the party', 'Deep converser', 'Nah, I\'d stay at home'];
  option_three = ['Nice and Friendly', 'Intelligent and wise', 'Achiever', 'Mediator'];
  options = [this.option_one, this.option_two, this.option_three];

  constructor(public router: Router,
              public surResult: SurveyResultService,
              private elementRef: ElementRef) { }

  register(i) {
    console.log(this.slideIndex);
    if (this.res[this.slideIndex - 1] !== undefined) {
      console.log('not null');
      console.log(this.res[this.slideIndex - 1]);
      this.res[this.slideIndex - 1] = i;
    } else {
      this.res.push(i);
    }

    console.log(this.res);
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
    console.log(this.res_one);
    this.showSlides(this.slideIndex += n);
  }

  // API call for card
  submit(res) {
    this.surResult.get_card(this.res[0], this.res[1]);
    this.router.navigate(['card']);
  }

  ngAfterViewInit() {
    this.showSlides();
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  ngOnInit() {
  }

}
