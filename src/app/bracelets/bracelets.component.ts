import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {BraceletService} from '../_services/bracelet.service';
import {Bracelet} from '../_models/Bracelet';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-bracelets',
  templateUrl: './bracelets.component.html',
  styleUrls: ['./bracelets.component.css']
})
export class BraceletsComponent implements OnInit {

  private bracelets: Bracelet[];

  displayedColumns: string[] = ['model', 'owner', 'oemail', 'mname', 'mversion', 'verified', 'operation'];
  dataSource = new MatTableDataSource([]);


  constructor(
    private braceletService: BraceletService,
    public dialog: MatDialog
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    // load all users
    this.loadAllBracelets();
  }

  private loadAllBracelets() {
    this.braceletService.getAll().subscribe(bracelets => {
      console.log(bracelets);
      this.bracelets = bracelets;
      this.dataSource = new MatTableDataSource(this.bracelets);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isNull(user: any) {
    return user;
  }

  unPairBracelet(_id: string) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to continue ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.braceletService.unPairDevice(_id).subscribe(() => {
          this.loadAllBracelets();
        });
      }
    });
  }

  pairBracelet(braceletId: string, userId: string) {
    // pop up to select a user and then pair : /bracelet/unpair/:braceletid
    this.braceletService.pairDevice(braceletId, userId).subscribe(() => {
      this.loadAllBracelets();
    });
  }
}
