import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EditEventPopupComponent } from 'src/app/components/popups/edit-event-popup/edit-event-popup.component';
import { EventData } from 'src/app/shared/interfaces/common.interface';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
     selector: 'app-header',
     templateUrl: './header.component.html',
     styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
     constructor(
          private _eventService: EventService,
          private _snackBar: MatSnackBar,
          private _dialog: MatDialog,
          private _scrollStrategyOptions: ScrollStrategyOptions
     ) {}

     ngOnInit(): void {}
}
