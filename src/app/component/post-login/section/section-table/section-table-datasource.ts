import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Section } from 'src/app/interface/section.interface';
import { Table } from 'src/app/interface/common/table.interface';
import { SectionService } from 'src/app/service/section.service';



/**
 * Data source for the SectionTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SectionTableDataSource extends DataSource<Table<Section>> {
  size: number = 0;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  private sectionSubject = new BehaviorSubject<Table<Section>[]>([]);

  constructor(private sectionService: SectionService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Table<Section>[]> {
    if (this.paginator && this.sort) {
      return this.sectionSubject.asObservable();       
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { 
    this.sectionSubject.complete();
  }

  loadSections() {

    return this.sectionService.getSectionForTable().pipe(map(t => {
      this.size = t.totalSize;
      return t.data;
    })).subscribe(data=>this.sectionSubject.next(data));
}

}
