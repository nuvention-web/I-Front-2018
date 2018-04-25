import { Component, OnInit } from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';
import { ScentProfileCard } from '../model/profile-card';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  card_one: any;

  constructor(public surService: SurveyResultService) { }

  ngOnInit() {
    // GET card information from get_card API
    // store it it card_one
    // TODO: make this a seperate function for other cards to use
    this.surService._card.subscribe((val) => {
      this.card_one = val;
    });
  }
}
