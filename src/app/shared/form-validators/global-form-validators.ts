import { FormGroup } from '@angular/forms';

export class GlobalFormValidators {
     //
     public displaySingleFormError(group: FormGroup, formErrors: any, validationMessage: any) {
          Object.keys(group.controls).forEach((key: string) => {
               const abstractControl = group.get(key);
               if (abstractControl instanceof FormGroup) {
                    this.displaySingleFormError(abstractControl, formErrors, validationMessage);
               } else {
                    formErrors[key] = '';
                    if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
                         const messages = validationMessage[key];
                         for (const errorKey in abstractControl.errors) {
                              if (errorKey) {
                                   formErrors[key] += messages[errorKey] + ' ';
                              }
                         }
                    }
               }
          });
          return formErrors;
     }

     public displayAllFormErrors(group: FormGroup, formErrors: any, validationMessage: any) {
          Object.keys(group.controls).forEach((key: string) => {
               const abstractControl = group.get(key);
               if (abstractControl instanceof FormGroup) {
                    formErrors = this.displayAllFormErrors(abstractControl, formErrors, validationMessage);
               } else {
                    formErrors[key] = '';
                    if (abstractControl && !abstractControl.valid && validationMessage[key]) {
                         const messages = validationMessage[key];
                         for (const errorKey in abstractControl.errors) {
                              if (messages[errorKey]) {
                                   formErrors[key] += messages[errorKey] + ' ';
                              }
                         }
                    }
               }
          });
          return formErrors;
     }
}
