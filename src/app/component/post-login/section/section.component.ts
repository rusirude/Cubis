import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { TaskEnum } from 'src/app/utility/task.enum';
import { SectionFormComponent } from './section-form/section-form.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SectionFormComponent,{
      width:'30%',
      data:{
        key:null,
        type: TaskEnum.CREATE
      }
    });
  }

}
