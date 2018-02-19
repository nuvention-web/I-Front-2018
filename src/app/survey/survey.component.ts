import { Component, OnInit } from '@angular/core';
import { SuveryResultService } from '../service/suvery-result.service';
import { ResponseForm } from '../model/response-form';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  res_one: number;
  res_two: number;
  res_three: number;
  res_four: number;

  ones = ["q1resp1", "q1resp2"];
  twos = ["q2resp1", "q2resp2"];
  threes = ["q3resp1", "q3resp2"];
  fours = ["q4resp1", "q4resp2"];

  result: ResponseForm;

  constructor(public sresult: SuveryResultService) { }

  submit(res_one, res_two, res_three, res_four) {
    this.sresult.post_result(this.res_one, this.res_two, this.res_three, this.res_four);
  }

  ngOnInit() {
  }

}
