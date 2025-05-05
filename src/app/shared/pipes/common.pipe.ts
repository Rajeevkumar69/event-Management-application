import { Pipe, PipeTransform } from '@angular/core';
import { EventData } from '../interfaces/common.interface';

@Pipe({
     name: 'searchEvents'
})
export class SearchPipe implements PipeTransform {
     transform(events: EventData[], searchText: string): EventData[] {
          if (!events || !searchText) return events;

          const searchLower = searchText.toLowerCase();

          return events.filter((event) => event.title?.toLowerCase().includes(searchLower) || event.description?.toLowerCase().includes(searchLower) || event.hashtag?.toLowerCase().includes(searchLower));
     }
}
