import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GlobalFormValidators } from 'src/app/shared/form-validators/global-form-validators';
import { FormModel } from 'src/app/shared/models/form.model';

@Component({
     selector: 'app-edit-event-popup',
     templateUrl: './edit-event-popup.component.html',
     styleUrls: ['./edit-event-popup.component.scss']
})
export class EditEventPopupComponent implements OnInit {
     public dialogeData: any;
     public eventForm: FormGroup = new FormGroup({});
     public formModel: FormModel;
     public globalFormValidator: GlobalFormValidators;
     public formErrors: any;
     public validationMessage: any;

     constructor(
          @Inject(MAT_DIALOG_DATA) public DIALOGE_DATA: any,
          private _dialogRef: MatDialogRef<EditEventPopupComponent>,
          private _dialog: MatDialog,
          private _formBuilder: FormBuilder,
          private _cdr: ChangeDetectorRef
     ) {
          this.dialogeData = this.DIALOGE_DATA;
          this.formModel = new FormModel();
          this.globalFormValidator = new GlobalFormValidators();
     }

     ngOnInit(): void {
          this.createEditEventForm();
     }

     public createEditEventForm() {
          this.eventForm = this._formBuilder.group({
               title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
               date: new FormControl('', [Validators.required]),
               location: new FormControl('', [Validators.required]),
               description: new FormControl(''),
               hashtag: new FormControl(''),
               image: new FormControl(''),
               product: new FormControl('', [Validators.required]),
               scope: new FormControl('', [Validators.required]),
               category: new FormControl('', [Validators.required]),
               popularity: new FormControl('', [Validators.required]),
               status: new FormControl('', [Validators.required])
          });
          this.loadFormProperty('eventForm');
          if (this.dialogeData?.status === 'Update') {
               this.setFormValue();
          }
     }

     public setFormValue() {
          const data = this.dialogeData?.data || {};
          if (this.dialogeData?.status === 'Update') {
               this.eventForm.patchValue({
                    title: data.title || '',
                    date: data.date || '',
                    location: data.location || '',
                    description: data.description || '',
                    hashtag: data.hashtag || '',
                    image: data.image || '',
                    product: data.product || '',
                    scope: data.scope || '',
                    category: data.category || '',
                    tags: data.tags || [],
                    popularity: data.popularity ?? 0,
                    status: data.status || ''
               });
          }
     }

     public saveModifiedData() {
          if (this.eventForm.valid) {
               this._dialogRef.close(this.eventForm.value);
          } else {
               this.displayAllFormErrors(this.eventForm);
          }
     }

     public loadFormProperty(form: string) {
          this.formErrors = this.formModel.formErrors[form];
          this.validationMessage = this.formModel.validationMessage[form];
     }
     public displaySingleFormError(group: FormGroup) {
          this.formErrors = this.globalFormValidator.displaySingleFormError(group, this.formErrors, this.validationMessage);
     }

     public displayAllFormErrors(group: FormGroup) {
          this.formErrors = this.globalFormValidator.displayAllFormErrors(group, this.formErrors, this.validationMessage);
     }

     public closeDialog() {
          this._dialogRef.close();
     }
}
