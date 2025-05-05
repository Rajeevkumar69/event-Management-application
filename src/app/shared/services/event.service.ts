import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { featuredEvent, recentEvents, upcomingEvents } from '../constants/global-constant';
import { EventData } from '../interfaces/common.interface';

@Injectable({
     providedIn: 'root'
})
export class EventService {
     private recentEvents: EventData[] = [...recentEvents];

     constructor() {
          const deletedIds = JSON.parse(localStorage.getItem('deletedEvents') || '[]');
          this.recentEvents = this.recentEvents.filter((event) => !deletedIds.includes(event.id));
     }

     getFeaturedEvent(): Observable<EventData> {
          return of(featuredEvent);
     }

     getUpcomingEvents(): Observable<EventData[]> {
          return of(upcomingEvents);
     }

     getRecentEvents(): Observable<EventData[]> {
          return of(this.recentEvents);
     }

     deleteEvent(id: number): Observable<void> {
          try {
               this.recentEvents = this.recentEvents.filter((event) => event.id !== id);
               const deletedIds = JSON.parse(localStorage.getItem('deletedEvents') || '[]');
               deletedIds.push(id);
               localStorage.setItem('deletedEvents', JSON.stringify(deletedIds));
               return of(void 0);
          } catch (error) {
               return throwError(() => new Error('Failed to delete event'));
          }
     }

     saveFilters(filters: { year: string; product: string; category: string }): void {
          localStorage.setItem('eventFilters', JSON.stringify(filters));
     }

     loadFilters(): {
          year: string;
          product: string;
          category: string;
     } {
          return JSON.parse(localStorage.getItem('eventFilters') || '{}');
     }
}
