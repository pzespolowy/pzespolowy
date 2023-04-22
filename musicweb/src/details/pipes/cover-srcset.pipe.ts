import { Pipe, PipeTransform } from '@angular/core';
import { Album } from 'src/app/interfaces/album.interface';
import { Track } from 'src/app/interfaces/track.interface';

@Pipe({
	name: 'coverSrcset',
})
export class CoverSrcsetPipe implements PipeTransform {
	transform(track: Track | Album): string {
		return `${track.coverSmall} 56w, ${track.coverMedium} 250w, ${track.coverBig} 500w, ${track.coverXl} 1000w`;
	}
}
