import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'mw-double-filter',
	templateUrl: './double-filter.component.html',
})
export class DoubleFilterComponent implements OnInit {
	@Input()
	label!: string;

	@Input()
	additionalLabel!: string;

	@Input()
	form!: FormGroup;

	@Input()
	defualtUpperBound!: number;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.form.addControl(
			`${this.label.toLowerCase()}From`,
			this.fb.control('', Validators.min(0))
		);
		this.form.addControl(
			`${this.label.toLowerCase()}To`,
			this.fb.control(this.defualtUpperBound || '', Validators.min(0))
		);
	}
}
