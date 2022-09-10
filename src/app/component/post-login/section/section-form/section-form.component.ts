import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionService } from 'src/app/service/section.service';
import { TaskEnum } from 'src/app/utility/task.enum';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css']
})
export class SectionFormComponent implements OnInit {

  uuid: string = '';
  title: string = 'Create Section';
  sectionForm !: FormGroup;


  constructor(
    private sectionService: SectionService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SectionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string, type: TaskEnum },
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.title = (this.data.type === TaskEnum.CREATE) ? 'Create Section' : 'Update Section';;
    this.sectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
    if (this.data.type === TaskEnum.UPDATE) {
      this.sectionService.sectionSub
        .subscribe(s => {
          this.uuid = s.key;
          this.sectionForm.controls["description"].setValue(s.data.description);
          this.sectionForm.controls["status"].setValue(s.data.status);
        });
    }
  }

  createSection(): void {
    if (this.sectionForm.valid) {
      this.sectionService.createSection(this.sectionForm.value).subscribe(data => {
        this.sectionForm.reset();
        this.dialogRef.close();
        this.showMessage(data.code, data.message);
      });
    }

  }

  updateSection(): void {
    if (this.sectionForm.valid) {
      this.sectionService.updateSection({
        description: this.sectionForm.controls["description"].value,
        status: this.sectionForm.controls["status"].value
      }, this.uuid).subscribe(data => {
        this.sectionForm.reset();
        this.dialogRef.close();
        this.showMessage(data.code,data.message);
      });
    }

  }

  private showMessage(type: string, message: string): void {
    this.snackBar.open(message, type, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1500
    });
  }

  get taskType(): typeof TaskEnum {
    return TaskEnum;
  }


}
