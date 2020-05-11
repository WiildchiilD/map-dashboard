import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../_services/users.service';
import {User} from '../_models/User';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatPaginator} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  private users: User[];

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'verified', 'Operation'];
  dataSource = new MatTableDataSource([]);


  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    // load all users
    this.loadAllUsers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you confirm the deletion of this data?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        // DO SOMETHING
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadAllUsers() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  change(element: any) {
    this.userService.verifyUser(element._id, !element.verified)
      .subscribe(apiResponse => {
        console.log(apiResponse);
        if (apiResponse.error === undefined) {
          element.verified = apiResponse.success;
        } else {
          element.verified = false;
          // MAY POP UP SOME ERROR
        }
      });
  }

  deleteUser(element: number) {
    this.openDialog();
  }
}
