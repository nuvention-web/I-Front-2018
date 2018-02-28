import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScentProfileCard } from '../model/profile-card';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
const perf_back_api = 'http://127.0.0.1:5000/';

@Injectable()
export class SurveyResultService {
  // public card: Observable<ScentProfileCard>;
  // private _obs_result = new BehaviorSubject<Observable<ScentProfileCard>>(this.card);
  // public readonly survey_result: Observable<ScentProfileCard> = this._obs_result.asObservable();


  public card: ScentProfileCard;
  public perfumes: any[];
  public obs_card: Observable<ScentProfileCard>;
  public _card: BehaviorSubject<ScentProfileCard>;
  public cardStore: {
    cards: ScentProfileCard[];
  };

  constructor(public http: HttpClient) {
    this.cardStore = { cards: [] };
    this._card = <BehaviorSubject<ScentProfileCard>>new BehaviorSubject(this.card);
    this.obs_card = this._card.asObservable();
  }

  // // deprecated post method
  // post_result(res_one, res_two) {
  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   // const postAPI = perf_back_api + 'quiz/';
  //   const hostAPI = 'http://ec2-54-213-192-222.us-west-2.compute.amazonaws.com/quiz';
  //   // console.log(perf_back_api + 'quiz');
  //   console.log(hostAPI);
  //   // return this.http.post(perf_back_api + 'quiz', {
  //   return this.http.post(hostAPI, {
  //     ans1: res_one,
  //     ans2: res_two,
  //   })
  //     .subscribe(
  //       res => {
  //         console.log(res);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  // }

  get_card(res_one: number, res_two: number) {
    const cardAPI = 'http://ec2-54-213-192-222.us-west-2.compute.amazonaws.com/quiz';
    return this.http.get(cardAPI).subscribe(
      res_data => {
        this._card = res_data[0];
        this.perfumes = res_data[1];
      }
    );
  }

  // this.msSto re.obs_milestones.subscribe(((val) => {
  //   this.msStoreList = val;
  // }));
}
