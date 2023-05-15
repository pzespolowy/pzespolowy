import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/shared/shared.module';
import { DoubleFilterComponent } from './components/double-filter/double-filter.component';
import { LibraryComponent } from './components/library/library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [DoubleFilterComponent, LibraryComponent],
	imports: [
		SharedModule,
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MatFormFieldModule,
		LibraryRoutingModule,
		MatSelectModule,
		MatInputModule,
		MatOptionModule,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
})
export class LibraryModule {}
