import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EventData } from 'src/app/shared/interfaces/common.interface';
import { EventService } from 'src/app/shared/services/event.service';
import { EventDetailsPopupComponent } from '../popups/event-details-popup/event-details-popup.component';
import { EditEventPopupComponent } from '../popups/edit-event-popup/edit-event-popup.component';

@Component({
     selector: 'app-event-list',
     templateUrl: './event-list.component.html',
     styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, AfterViewInit {
     public featuredEvent!: EventData;
     public upcomingEvents: EventData[] = [];
     public filteredEvents = new MatTableDataSource<EventData>([]);
     public displayedColumns: string[] = ['date', 'title', 'product', 'scope', 'status', 'actions'];
     public searchText: string = '';
     public selectedCategory: string = '';
     public selectedYear: string = '';
     public selectedProduct: string = '';
     public sortBy: string = '';
     public favoriteEvents: number[] = [];
     public selectedEvent: EventData | null = null;
     public pageSize: number = 5;
     public pageIndex: number = 0;
     public paginatedEvents: any[] = [];
     allEvents: EventData[] = [];

     @ViewChild(MatPaginator) paginator!: MatPaginator;

     constructor(
          private _eventService: EventService,
          private _snackBar: MatSnackBar,
          private _dialog: MatDialog,
          private _scrollStrategyOptions: ScrollStrategyOptions
     ) { }

     ngOnInit(): void {
          this._eventService.getFeaturedEvent().subscribe({
               next: (event) => {
                    this.featuredEvent = {
                         ...event,
                         countdown: this.calculateCountdown(event.date),
                         status: this.getEventStatus(event.date),
                    };
               },
               error: () => {
                    this._snackBar.open('Failed to load featured event', 'Close', { duration: 3000 });
               },
          });

          this._eventService.getUpcomingEvents().subscribe({
               next: (events) => {
                    this.upcomingEvents = events.map((event) => ({
                         ...event,
                         countdown: this.calculateCountdown(event.date),
                         status: this.getEventStatus(event.date),
                    }));
               },
               error: () => {
                    this._snackBar.open('Failed to load upcoming events', 'Close', { duration: 3000 });
               },
          });

          this._eventService.getRecentEvents().subscribe({
               next: (events) => {
                    this.allEvents = events.map((event) => ({
                         ...event,
                         status: this.getEventStatus(event.date),
                    }));

                    this.applyFilters();
               },
               error: () => {
                    this._snackBar.open('Failed to load recent events', 'Close', { duration: 3000 });
               },
          });

          const savedFilters = this._eventService.loadFilters();
          this.selectedYear = savedFilters.year || '';
          this.selectedProduct = savedFilters.product || '';
          this.selectedCategory = savedFilters.category || '';
          this.favoriteEvents = JSON.parse(localStorage.getItem('favoriteEvents') || '[]');
     }


     ngAfterViewInit(): void {
          this.filteredEvents.paginator = this.paginator;
     }
     applyFilters() {
          let events = this.allEvents;

          if (this.searchText.trim()) {
               const searchLower = this.searchText.trim().toLowerCase();
               events = events.filter(e =>
                    e.title.toLowerCase().includes(searchLower) ||
                    e.product?.toLowerCase().includes(searchLower) ||
                    e.status?.toLowerCase().includes(searchLower)
               );
          }

          if (this.selectedCategory) {
               events = events.filter(e => e.category === this.selectedCategory);
          }

          if (this.selectedYear) {
               events = events.filter(e => e.date.includes(this.selectedYear));
          }

          if (this.selectedProduct) {
               events = events.filter(e => e.product === this.selectedProduct);
          }

          if (this.sortBy) {
               events = [...events].sort((a, b) => {
                    if (this.sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
                    if (this.sortBy === 'title') return a.title.localeCompare(b.title);
                    if (this.sortBy === 'popularity') return (b.popularity ?? 0) - (a.popularity ?? 0);
                    return 0;
               });
          }

          this.filteredEvents.data = events;
          this.filteredEvents.paginator = this.paginator;
     }

     onSearchChange() {
          this.applyFilters();
     }

     public calculateCountdown(date: string) {
          const eventDate = new Date(date);
          const now = new Date();
          const diff = eventDate.getTime() - now.getTime();
          if (diff <= 0) return '';
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          return `${days}d ${hours}h`;
     }

     public getEventStatus(date: string) {
          const eventDate = new Date(date);
          const now = new Date();
          if (eventDate.getTime() < now.getTime()) return 'Ended';
          if (Math.abs(eventDate.getTime() - now.getTime()) < 24 * 60 * 60 * 1000) return 'Live';
          return 'Upcoming';
     }

     public filterEvents() {
          this._eventService.getRecentEvents().subscribe({
               next: (events) => {
                    let filtered = [...events].map((event) => ({
                         ...event,
                         status: this.getEventStatus(event.date)
                    }));

                    if (this.selectedYear) {
                         filtered = filtered.filter((event) => event.date.includes(this.selectedYear));
                    }

                    if (this.selectedProduct) {
                         filtered = filtered.filter((event) => event.product === this.selectedProduct);
                    }

                    if (this.selectedCategory) {
                         filtered = filtered.filter((event) => event.category === this.selectedCategory);
                    }

                    this.filteredEvents.data = filtered;
                    this._eventService.saveFilters({
                         year: this.selectedYear,
                         product: this.selectedProduct,
                         category: this.selectedCategory
                    });
               },
               error: () => {
                    this._snackBar.open('Failed to filter events', 'Close', { duration: 3000 });
               }
          });
     }

     public sortEvents() {
          const data = [...this.filteredEvents.data];
          if (this.sortBy === 'date') {
               data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          } else if (this.sortBy === 'title') {
               data.sort((a, b) => a.title.localeCompare(b.title));
          } else if (this.sortBy === 'popularity') {
               data.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
          }
          this.filteredEvents.data = data;
     }

     public toggleFavorite(event: EventData) {
          if (this.isFavorite(event)) {
               this.favoriteEvents = this.favoriteEvents.filter((id) => id !== event.id);
          } else {
               this.favoriteEvents.push(event.id);
          }
          localStorage.setItem('favoriteEvents', JSON.stringify(this.favoriteEvents));
          this._snackBar.open(`Event ${event.title} ${this.isFavorite(event) ? 'added to' : 'removed from'} favorites`, 'Close', { duration: 3000 });
     }

     public isFavorite(event: EventData) {
          return this.favoriteEvents.includes(event.id);
     }

     public shareEvent(event: EventData) {
          const shareUrl = `https://example.com/events/${event.id}`;
          navigator.clipboard.writeText(`${event.title}: ${shareUrl}`);
          this._snackBar.open('Event link copied to clipboard', 'Close', { duration: 3000 });
     }

     public exportEvents() {
          const csv = this.filteredEvents.data.map((event) => ({
               Date: event.date,
               Title: event.title,
               Product: event.product,
               Scope: event.scope,
               Status: event.status
          }));
          const csvContent = ['Date,Title,Product,Scope,Status', ...csv.map((row) => `${row.Date},${row.Title},${row.Product},${row.Scope},${row.Status}`)].join('\n');
          const blob = new Blob([csvContent], {
               type: 'text/csv'
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'events.csv';
          a.click();
          window.URL.revokeObjectURL(url);
     }

     public openDetailsModal(event: any) {
          this._dialog
               .open(EventDetailsPopupComponent, {
                    data: event,
                    enterAnimationDuration: '300ms',
                    exitAnimationDuration: '300ms',
                    maxWidth: '800px',
                    width: '90vw',
                    panelClass: 'event-details-dialogue',
                    disableClose: true,
                    scrollStrategy: this._scrollStrategyOptions.block()
               })
               .afterClosed()
               .subscribe();
     }

     public closeDetailsModal(): void {
          this._dialog.closeAll();
          this.selectedEvent = null;
     }

     public registerEvent(event: any) {
          this._snackBar.open(`Registered for ${event.title}`, 'Close', { duration: 3000 });
     }

     public onPageChange(event: PageEvent): void { }

     public editEvent(event: EventData) {
          let payload = {
               title: ' Update Event',
               status: 'Update',
               data: event
          };
          const dialogRef = this._dialog.open(EditEventPopupComponent, {
               data: payload,
               enterAnimationDuration: '300ms',
               exitAnimationDuration: '300ms',
               width: '90vw',
               maxHeight: '90vh',
               panelClass: 'edit-event-dialogue',
               disableClose: true,
               scrollStrategy: this._scrollStrategyOptions.block()
          });
          dialogRef.afterClosed().subscribe((updatedData: EventData) => {
               if (updatedData) {
                    const index = this.filteredEvents.data.findIndex((e) => e.id === event.id);
                    if (index !== -1) {
                         this.filteredEvents.data[index] = {
                              ...updatedData,
                              status: this.getEventStatus(updatedData.date)
                         };
                         this.filteredEvents.data = [...this.filteredEvents.data];
                         this._snackBar.open(`${updatedData.title} updated successfully`, 'Close', {
                              duration: 3000,
                              horizontalPosition: 'right',
                              verticalPosition: 'top'
                         });
                    }
               }
          });
     }

     public deleteEvent(event: EventData) {
          this._eventService.deleteEvent(event.id).subscribe({
               next: () => {
                    this._snackBar.open(`${event.title} deleted successfully`, 'Close', { duration: 3000 });
                    this._eventService.getRecentEvents().subscribe((events) => {
                         this.filteredEvents.data = events.map((e) => ({
                              ...e,
                              status: this.getEventStatus(e.date)
                         }));
                         this.filterEvents();
                    });
               },
               error: () => {
                    this._snackBar.open('Failed to delete event', 'Close', { duration: 3000 });
               }
          });
     }

     public createNewEvent() {
          const payload = {
               title: 'Create New Event',
               status: 'Create'
          };
          const dialogRef = this._dialog.open(EditEventPopupComponent, {
               data: payload,
               enterAnimationDuration: '300ms',
               exitAnimationDuration: '300ms',
               width: '90vw',
               maxHeight: '90vh',
               panelClass: 'create-event-dialogue',
               disableClose: true,
               scrollStrategy: this._scrollStrategyOptions.block()
          });

          dialogRef.afterClosed().subscribe((newEvent: EventData) => {
               if (newEvent) {
                    newEvent.id = Date.now().toString(); // Assign unique ID
                    newEvent.status = this.getEventStatus(newEvent.date);
                    this.filteredEvents.data = [newEvent, ...this.filteredEvents.data];
                    this._snackBar.open(`${newEvent.title} created successfully`, 'Close', {
                         duration: 3000,
                         horizontalPosition: 'right',
                         verticalPosition: 'top'
                    });
               }
          });
     }
}
