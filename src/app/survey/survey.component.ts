import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';
import { ResponseForm } from '../model/response-form';

import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  res_one: number;
  res_two: number;
  res_three: number;
  res = [];
  slideIndex = 1;

  // mock quizzes
  // questions
  questions = ['Which sensory experience would be the most appealing to you?',
              'When and where might you wear the fragrance you’re looking for today?',
              'Which of the following scent types appeals most to you?'];

  option_one = ['Enjoying a fruity drink and an ocean breeze', 'Walking through a serene garden in full bloom',
    'Tasting exotic cuisines and decadent desserts', 'Adventuring off the grid and deep into nature'];
  option_two = ['work or school', 'formal event', 'casual outing', 'kickback'];
  option_three = ['aquatic and fruity', 'floral', 'spicy', 'woody'];

  constructor(public router: Router,
              public surResult: SurveyResultService,
              private elementRef: ElementRef) { }

  register() {
  }

  showSlides(n?) {
    let i;
    const slides = document.getElementsByClassName('slides');
    console.log(slides);
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
    console.log(dots[this.slideIndex - 1]);
    (dots[this.slideIndex - 1] as HTMLElement).classList.add('active');
  }

  // Next/previous controls
  plusSlides(n) {
    console.log(n);
    this.showSlides(this.slideIndex += n);
  }

  submit(res_one, res_two) {
    this.surResult.get_card(this.res_one, this.res_two);
    this.router.navigate(['card']);
  }

  ngOnInit() {
    this.showSlides();
  }

}
