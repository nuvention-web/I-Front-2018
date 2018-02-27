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

  public image_url: string;

  constructor(public surService: SurveyResultService) { }

  // when a scent profile card is made
  // get the profile card from the service onInit
  ngOnInit() {
    this.surService._card.subscribe((data => {
      this.card = data[0];
    }));
    this.image_url = this.card.scent_profile_image;
  }

  // this.msStore.obs_milestones.subscribe(((val) => {
  //   this.msStoreList = val;
  // }));
}
