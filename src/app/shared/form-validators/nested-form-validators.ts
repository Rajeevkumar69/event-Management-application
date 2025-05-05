import { FormArray, FormGroup } from '@angular/forms';

export class NestedFormValidator {
     formErrors: any;

     public singleError(group: FormGroup, formErrors: any = {}, validationMessage: any = {}): any {
          Object.keys(group.controls).forEach((key: string) => {
               const abstractControl = group.get(key);
               if (!formErrors[key]) {
                    formErrors[key] = '';
               }

               if (abstractControl instanceof FormGroup) {
                    formErrors[key] = this.singleError(abstractControl, formErrors[key] || {}, validationMessage[key] || {});
               } else if (abstractControl) {
                    formErrors[key] = '';

                    if (!abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
                         if (validationMessage[key]) {
                              const messages = validationMessage[key];
                              for (const errorKey in abstractControl.errors) {
                                   if (abstractControl.errors.hasOwnProperty(errorKey) && messages[errorKey]) {
                                        formErrors[key] += messages[errorKey] + ' ';
                                   }
                              }
                         }
                    }
               }
          });
          return formErrors;
     }

     public allErrors(group: FormGroup, formErrors: any = {}, validationMessage: any = {}): any {
          Object.keys(group.controls).forEach((key: string) => {
               const abstractControl = group.get(key);
               if (!formErrors[key]) {
                    formErrors[key] = '';
               }

               if (abstractControl instanceof FormGroup) {
                    formErrors[key] = this.allErrors(abstractControl, formErrors[key], validationMessage[key]);
               } else if (abstractControl) {
                    formErrors[key] = '';

                    if (!abstractControl.valid) {
                         if (validationMessage[key]) {
                              const messages = validationMessage[key];
                              for (const errorKey in abstractControl.errors) {
                                   if (abstractControl.errors.hasOwnProperty(errorKey) && messages[errorKey]) {
                                        formErrors[key] += messages[errorKey] + ' ';
                                   }
                              }
                         }
                    }
               }
          });
          return formErrors;
     }

     public displayNestedFormErrors(group: FormGroup, key: string, errors: any = {}, message: any = {}, isSingle: boolean): any {
          const _tempGroup = group.get(key) as FormGroup;

          if (_tempGroup) {
               if (isSingle) {
                    errors[key] = this.singleError(_tempGroup, errors[key], message[key]);
               } else {
                    errors[key] = this.allErrors(_tempGroup, errors[key], message[key]);
               }

               if (key === 'AreaDetails') {
                    const floorUnitArray = _tempGroup.get('FloorUnitArray') as FormArray;
                    if (floorUnitArray && floorUnitArray.controls) {
                         floorUnitArray.controls.forEach((floorUnitControl, index) => {
                              if (floorUnitControl instanceof FormGroup) {
                                   const floorUnitErrors = errors[key].FloorUnitArray || [];
                                   floorUnitErrors[index] = floorUnitErrors[index] || {};
                                   floorUnitErrors[index].Floor = this.singleError(floorUnitControl, floorUnitErrors[index].Floor || {}, message[key]?.Floor || {});
                                   floorUnitErrors[index].UnitNo = this.singleError(floorUnitControl, floorUnitErrors[index].UnitNo || {}, message[key]?.UnitNo || {});
                                   errors[key].FloorUnitArray = floorUnitErrors;
                              }
                         });
                    }
               }
          } else if (key === 'lesseDetails' || key === 'lessorDetails' || key === 'dateAndTimeLine' || key === 'rentalAndSecurityDetails' || key === 'MiscellaneousInformation') {
               const _tempGroup = group.get(key) as FormGroup;
               if (_tempGroup) {
                    if (isSingle) {
                         errors[key] = this.singleError(_tempGroup, errors[key], message[key]);
                    } else {
                         errors[key] = this.allErrors(_tempGroup, errors[key], message[key]);
                    }
               }
          }

          return errors;
     }
}
