import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
     selector: 'app-event-details-popup',
     templateUrl: './event-details-popup.component.html',
     styleUrls: ['./event-details-popup.component.scss']
})
export class EventDetailsPopupComponent implements OnInit {
     public dialogeData: any;
     constructor(
          @Inject(MAT_DIALOG_DATA) public DIALOGE_DATA: any,
          private _dialogRef: MatDialogRef<EventDetailsPopupComponent>,
          private _dialog: MatDialog
     ) {
          this.dialogeData = this.DIALOGE_DATA;
     }

     ngOnInit(): void {}

     public closeDialog() {
          this._dialog.closeAll();
     }
}
