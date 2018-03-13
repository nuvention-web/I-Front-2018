import { Component, OnInit } from '@angular/core';
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

  ones = ['Work or school', 'Formal event', 'Casual outing', 'Kickback'];
  twos = ['Aquatic and fruity', 'Floral', 'Spicy', 'Woody'];

  // mock quizes
  fake_ones = ['Feminie' , 'Masculine', 'Doesn\'t matter as long as I love it!'];
  fake_twos = ['Inoffensive to others', 'Generally pleasant', 'Uniquely you'];
  fake_threes = ['Something trendy', 'Something unique', 'I\'ll try anything'];
  fake_fours = ['Enjoying a fruity drink and an ocean breeze', 'Walking through a serene garden in full bloom',
  'Tasting exotic cuisines and decadent desserts', 'Adventuring off the grid and deep into nature'];
  fake_fives = ['Almost every day', 'A few times a month', 'Less than once a month'];


  result: ResponseForm;

  constructor(public router: Router,
              public surResult: SurveyResultService) { }

  submit(res_one, res_two) {
    this.surResult.get_card(this.res_one, this.res_two);
    this.router.navigate(['card']);
  }

  ngOnInit() {
  }

}
