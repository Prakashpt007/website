import {Component} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

/**
 * @title Chips avatar
 * @description An avatar inside a chip
 */
@Component({
	selector: 'chips-avatar-example',
	template: `
<h6>Chips avatar</h6>
	<mat-chip-listbox aria-label="Dog selection">
  <mat-chip>
    <img matChipAvatar src="https://material.angular.io/assets/img/examples/shiba1.jpg" alt="Photo of a Shiba Inu"/>
    Dog one
  </mat-chip>
  <mat-chip color="primary">
    <img matChipAvatar src="https://material.angular.io/assets/img/examples/shiba1.jpg" alt="Photo of a Shiba Inu"/>
    Dog two
  </mat-chip>
  <mat-chip color="accent">
    <img matChipAvatar src="https://material.angular.io/assets/img/examples/shiba1.jpg" alt="Photo of a Shiba Inu"/>
    Dog three
  </mat-chip>
</mat-chip-listbox>

	`,
	standalone: true,
	imports: [MatChipsModule],
})
export class ChipsAvatarExample { }
