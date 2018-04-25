import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScentProfileCard } from '../model/profile-card';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
// import { router } from '../routes';
import { Router } from '@angular/router';

const perf_back_api = 'http://127.0.0.1:5000/quiz/';

@Injectable()
export class SurveyResultService {
  // public card: Observable<ScentProfileCard>;
  // private _obs_result = new BehaviorSubject<Observable<ScentProfileCard>>(this.card);
  // public readonly survey_result: Observable<ScentProfileCard> = this._obs_result.asObservable();


  public card: ScentProfileCard;
  public perfumes: any[];
  public obs_card: Observable<any>;
  public _card = new BehaviorSubject<ScentProfileCard>;
  public cardStore: {
    cards: ScentProfileCard[];
  };

  constructor(public http: HttpClient,
              public router: Router) {
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

  get_result() {
    return this.obs_card;
  }

  get_card(res_one: number, res_two: number): Observable<any> {
    this._card = new BehaviorSubject<ScentProfileCard>;
    console.log('get_card accessed in service');
    // const cardAPI = 'http://ec2-34-211-205-1.us-west-2.compute.amazonaws.com/quiz/' + res_one + '/' + res_two;
    const cardAPI = 'http://127.0.0.1:5000/quiz/' + res_one + '/' + res_two;
    // const cardAPI = perf_back_api + res_one + '/' + res_two;
    console.log(cardAPI);
    const obs = this.http.get(cardAPI);
    console.log(obs);
    obs.subscribe( (response: Response) => {
      console.log('in subscribe');
      console.log(obs);
      const response_data = response['scent_profile'];
      console.log(response_data);
      this._card.next(response_data);
      this.obs_card = this._card.asObservable();
    })
    return this.obs_card;
  }
}
