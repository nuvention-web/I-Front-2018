import { Component, OnInit } from '@angular/core';
import { ScentProfileCard } from '../model/profile-card';
import { SurveyResultService } from '../service/survery-result.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  // Note:
  // Issue with X-XSS-Protection on youtube video
  // related Gitissue: https://github.com/CookPete/react-player/issues/288
  // See comment by 'phpony'

  public card: ScentProfileCard;
  public processed_url: string;

  public image_url: string;

  constructor(public surService: SurveyResultService) { }

  // modify youtube url string to autoplay at given time without control display
  set_youtube_url() {
    this.processed_url = this.card.video_url + '?start=' + this.card.start_time + '&controls=0&autoplay=1&showinfo=0';
    return this.processed_url;
  }

  // when a scent profile card is made
  // get the profile card from the service onInit
  ngOnInit() {
    this.surService.obs_card.subscribe((data => {
      this.card = data;
    }));
    this.image_url = this.card.profile_img_url;
    this.card.video_url = this.set_youtube_url();
  }

  // this.msStore.obs_milestones.subscribe(((val) => {
  //   this.msStoreList = val;
  // }));
}
