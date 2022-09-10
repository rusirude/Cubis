import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Section } from 'src/app/interface/section.interface';
import { SectionService } from 'src/app/service/section.service';
import { TaskEnum } from 'src/app/utility/task.enum';

@Component({
  selector: 'app-section-view',
  templateUrl: './section-view.component.html',
  styleUrls: ['./section-view.component.css']
})
export class SectionViewComponent implements OnInit{

  title:string = 'View Section';
  section: Section = {
    uuid: '',
    description: '',
    status: '',
    createdBy: '',
    createdTime: new Date(),
    updatedBy: '',
    updatedTime: new Date()
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { key: string, type: TaskEnum },
    private sectionService: SectionService
  ) { }

  ngOnInit(): void {
    this.title = (this.data.type === TaskEnum.VIEW)?'View Section':'Delete Section';
    this.sectionService.sectionSub
      .subscribe(s=>this.section=s.data);
  }

  get taskType(): typeof TaskEnum {
    return TaskEnum; 
  }

}
