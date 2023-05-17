import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Track } from 'src/app/interfaces/track.interface';
import { HomepageService } from 'src/home/services/homepage.service';

@Component({
  selector: 'mw-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  tracks: Track[] = [];
  isSearching = false;

  constructor(private homepageService : HomepageService) {}

  ngOnInit() {
    this.homepageService.getTracks().subscribe((ranks) => {
      forkJoin(
        ranks.map((elem) =>
          this.homepageService.getTrackRank(elem)
        )
      ).subscribe((searchResult) => {
        this.tracks = searchResult;
      });
    });
    
  }
}
