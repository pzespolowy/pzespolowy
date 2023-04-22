import { OnInit, Component, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'mw-text-with-label',
	templateUrl: './text-with-label.component.html',
})
export class TextWithLabelComponent implements OnInit {
	@Input()
	label!: string;

	@Input()
	message!: string;

	@Input()
	messageTemplate?: TemplateRef<any>;

	@Input()
	templateToDisplay?: string;

	ngOnInit(): void {
		if (this.templateToDisplay === 'default') {
			this.messageTemplate = undefined;
		}
	}
}
