import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const minMaxValidator =
     (minControlName: string, maxControlName: string): ValidatorFn =>
     (control: AbstractControl): ValidationErrors | null =>
          control.get(minControlName)?.value === undefined || control.get(maxControlName)?.value === undefined ? null : ((min, max) => (min === 0 || max === 0 ? { zeroNotAllowed: true } : min >= max ? { minLessThanMax: true } : null))(control.get(minControlName)?.value, control.get(maxControlName)?.value);
