import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScentProfileCard } from '../model/profile-card';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

const perf_back_api = 'http://127.0.0.1:5000/';

@Injectable()
export class SurveyResultService {
  // public card: Observable<ScentProfileCard>;
  // private _obs_result = new BehaviorSubject<Observable<ScentProfileCard>>(this.card);
  // public readonly survey_result: Observable<ScentProfileCard> = this._obs_result.asObservable();


  public card: Observable<ScentProfileCard[]>;
  public _card: BehaviorSubject<ScentProfileCard[]>;
  public cardStore: {
    cards: ScentProfileCard[];
  };

  constructor(public http: HttpClient) {
    this.cardStore = { cards: [] };
    this._card = <BehaviorSubject<ScentProfileCard[]>>new BehaviorSubject([]);
    this.card = this._card.asObservable();
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

  getCard(res_one: number, res_two: number): Observable<ScentProfileCard> {
    const cardAPI = 'http://ec2-54-213-192-222.us-west-2.compute.amazonaws.com/quiz';
    // get the card and push it into an the cards array
    this.http.get<ScentProfileCard>(cardAPI).subscribe(data => {
      this.cardStore.cards.push(data);
      this._card.next(Object.assign({}, this.cardStore).cards);
    }, err => console.log('cannot get card from the server'));
    return this.http.get<ScentProfileCard>(cardAPI);
  }

  // this.msSto re.obs_milestones.subscribe(((val) => {
  //   this.msStoreList = val;
  // }));
}
