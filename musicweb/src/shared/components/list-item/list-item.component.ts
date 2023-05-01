import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mw-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit{
  ngOnInit(): void {
    this.rank = 1;
    this.rating = 9.5;
    this.title = 'song title';
    this.opinionsCount = 10000;
    this.genre = 'Genre';
  }

  rank? : number;
  rating? :number;
  title? :string;
  opinionsCount? : number;
  genre? : string;
}
