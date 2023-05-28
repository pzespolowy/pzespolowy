import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mwOpinionsLabel',
})
export class OpinionsLabelPipe implements PipeTransform {
	transform(value: number | undefined): string {
		if (value == undefined) return '';
		return value === 1 ? `${value} opinion` : `${value} opinions`;
	}
}
