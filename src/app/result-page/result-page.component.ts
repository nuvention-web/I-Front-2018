import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';
import { ScentProfileCard } from '../model/profile-card';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit, AfterViewChecked, AfterViewInit {
  card_one: any;
  isDataLoaded = false;

  constructor(public surService: SurveyResultService) { }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    console.log(this.isDataLoaded);
    // GET card information from get_card API
    // store it it card_one
    // TODO: make this a seperate function for other cards to use
    this.surService._card.subscribe((val) => {
      console.log(val);
      if (val) {
        this.isDataLoaded = true;
      }
      this.card_one = val;
      console.log('====' + this.isDataLoaded);
    });

    console.log(this.card_one);
  }
}
