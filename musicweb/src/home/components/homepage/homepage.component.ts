import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/interfaces/track.interface';
import { HomepageService } from 'src/home/services/homepage.service';

@Component({
  selector: 'mw-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  tracks: Track[] = [];

  constructor(private homepageService : HomepageService) {}

  ngOnInit() {
    this.tracks = this.homepageService.getTracks().subscribe();
    console.log(this.tracks);
  }
}
