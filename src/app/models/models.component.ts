import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/users.service';
import {ModelsService} from '../_services/models.service';
import {User} from '../_models/User';
import {Model} from '../_models/Model';
import {DialogComponent} from './dialog/dialog.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  private models: Model[];

  constructor(
    private modelsService: ModelsService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.loadAllModels();
  }

  private loadAllModels() {
    this.modelsService.getAll().subscribe(models => {
      this.models = models;
    });
  }

  createModel() {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {firstname: '', lastname: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

  }
}


