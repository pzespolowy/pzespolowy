import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mwFirstUpper',
})
export class FirstUpperPipe implements PipeTransform {
	transform(value: string): string {
		return value.charAt(0).toUpperCase().concat(value.slice(1));
	}
}
