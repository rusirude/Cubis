import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Section } from 'src/app/interface/section.interface';
import { Table } from 'src/app/interface/common/table.interface';
import { SectionService } from 'src/app/service/section.service';
import { SectionTableDataSource } from './section-table-datasource';
import { MatDialog } from '@angular/material/dialog';
import { SectionViewComponent } from '../section-view/section-view.component';
import { SectionFormComponent } from '../section-form/section-form.component';
import { TaskEnum } from 'src/app/utility/task.enum';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-section-table',
  templateUrl: './section-table.component.html',
  styleUrls: ['./section-table.component.css']
})
export class SectionTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Table<Section>>;
  dataSource: SectionTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description', 'status', 'action'];

  constructor(
    private sectionService: SectionService,
    private dialog: MatDialog) {
    this.dataSource = new SectionTableDataSource(this.sectionService);
  }

  ngOnInit(): void {
    this.dataSource.loadSections()
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
     this.table.dataSource = this.dataSource;

    this.paginator.page
      .pipe(
        tap(() => this.dataSource.loadSections())
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.dataSource.loadSections())
      )
      .subscribe();
    


  }

  viewSection(key: String): void {
    this.sectionService.getSectionByKey(key);
    const dialogRef = this.dialog.open(SectionViewComponent, {
      width: '30%',
      data: {
        key: key,
        type: TaskEnum.VIEW
      }
    });
  }

  deleteSection(key: String): void {
    this.sectionService.getSectionByKey(key);
    const dialogRef = this.dialog.open(SectionViewComponent, {
      width: '30%',
      data: {
        key: key,
        type: TaskEnum.DELETE
      }
    });
  }

  editSection(key: String): void {
    this.sectionService.getSectionByKey(key);
    const dialogRef = this.dialog.open(SectionFormComponent, {
      width: '30%',
      data: {
        key: key,
        type: TaskEnum.UPDATE
      }
    });
  }
}
