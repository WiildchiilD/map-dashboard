import { BraceletService } from './../_services/bracelet.service';
import { Compose } from './../_models/compose';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-email-composer',
  templateUrl: './email-composer.component.html',
  styleUrls: ['./email-composer.component.css']
})
export class EmailComposerComponent{
  
  to = new FormControl('', [Validators.required, Validators.email]);
  content = new FormControl('', [Validators.required]);
  subject = new FormControl('', [Validators.required]);
  
  compose = new Compose()


  constructor(
    public dialogRef: MatDialogRef<EmailComposerComponent>,
    private bService : BraceletService,
    @Inject(MAT_DIALOG_DATA) public message: string) {
  }


  getErrorMessage() {
    return this.to.hasError('required') ? 'You must enter a value' :
        this.to.hasError('to') ? 'Not a valid email' :
            '';
  }

  onSend(): void {
    
    console.log("SENDIN THIS : "+this.compose)
    this.bService.sendEmail(this.compose).subscribe(response => {
      console.log(response)
      this.dialogRef.close();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
