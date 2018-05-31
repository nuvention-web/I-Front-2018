import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScentProfileCard } from '../model/profile-card';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

//// change here for local testing
// const perf_back_api = 'http://127.0.0.1:5000/';
const perf_back_api = 'http://ec2-18-237-88-77.us-west-2.compute.amazonaws.com/';

@Injectable()
export class SurveyResultService {
  public username = '';

  public card: ScentProfileCard;
  public perfumes: any[];
  public obs_card: Observable<any>;
  public _card = new BehaviorSubject<ScentProfileCard>(this.card);
  public cardStore: {
    cards: ScentProfileCard[];
  };
  private one_options = ['Dreamer', 'Charmer', 'Daredevil', 'Navigator'];
  private two_options = ['Observer', 'Enthusiast', 'Giver', 'Innovator'];
  private three_options = ['Creator', 'Architect', 'Achiever', 'Mediator'];

  constructor(public http: HttpClient,
              public router: Router) {
    this.cardStore = { cards: [] };
    this._card = <BehaviorSubject<ScentProfileCard>>new BehaviorSubject(this.card);
    this.obs_card = this._card.asObservable();
  }

  get_result() {
    return this.obs_card;
  }

  get_username() {
    return this.username;
  }

  // new get_card
  get_card(res_one: number, res_two: number, res_three: number, username: string): Observable<any> {
    this._card = new BehaviorSubject<ScentProfileCard>(this.card);
    // console.log('get_card accessed in service');

    this.username = username;
    const cardAPI = perf_back_api + 'notbought/mode';
    const obs = this.http.post(cardAPI, {
      q1: this.one_options[res_one],
      q2: this.two_options[res_two],
      q3: this.three_options[res_three],
      name: username
    });
    obs.subscribe( (response: Response) => {
      const response_data = response['response']['Cards'];
      // console.log(response_data);
      this._card.next(response_data);
      this.obs_card = this._card.asObservable();
    })
    return this.obs_card;
  }

  send_result(card_result: any, email: string) {
    console.log('sending the result of bought to db');
    const result = card_result;
    const boughtAPI = perf_back_api + 'bought/mode';
    const obs = this.http.post(boughtAPI, {
      q1: result[0].name,
      q2: result[1].name,
      q3: result[2].name,
      name: this.username,
      email: email,
    });
    obs.subscribe( (response: Response) => {
      const response_data = response['response'];
      // console.log(response_data);
    })
    window.location.href = 'https://www.tryperf.com/shop';
    return obs;
  }
}
