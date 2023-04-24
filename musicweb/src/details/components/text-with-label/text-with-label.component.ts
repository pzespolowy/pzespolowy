import { Component, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'mw-text-with-label',
	templateUrl: './text-with-label.component.html',
})
export class TextWithLabelComponent {
	@Input()
	label!: string;

	@Input()
	message!: string;

	@Input()
	messageTemplate?: TemplateRef<any>;
}
