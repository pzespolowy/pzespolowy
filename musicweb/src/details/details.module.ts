import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongdetailsComponent } from './components/songdetails/songdetails.component';



@NgModule({
  declarations: [SongdetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [SongdetailsComponent],
})
export class DetailsModule { }
