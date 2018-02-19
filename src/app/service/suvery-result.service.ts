import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const perf_back_api = 'http://127.0.0.1:5000/';

@Injectable()
export class SuveryResultService {

  constructor(public http: HttpClient) { }

  post_result(res_one, res_two, res_three, res_four) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // const postAPI = perf_back_api + 'quiz/';
    console.log(perf_back_api + 'quiz');
    return this.http.post(perf_back_api + 'quiz', {
      ans1: res_one,
      ans2: res_two,
      ans3: res_three,
      ans4: res_four
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }
}
