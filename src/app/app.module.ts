import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventCalendarComponent } from './components/event-calendar/event-calendar.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EditEventPopupComponent } from './components/popups/edit-event-popup/edit-event-popup.component';
import { EventDetailsPopupComponent } from './components/popups/event-details-popup/event-details-popup.component';
import { LayoutsModule } from './layouts/layouts.module';
import { SearchPipe } from './shared/pipes/common.pipe';

@NgModule({
     declarations: [AppComponent, EventListComponent, EventCalendarComponent, EventDetailsPopupComponent, EditEventPopupComponent, SearchPipe],
     imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, LayoutsModule, MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatSnackBarModule, MatDialogModule, FormsModule, ReactiveFormsModule],
     providers: [],
     bootstrap: [AppComponent]
})
export class AppModule {}
