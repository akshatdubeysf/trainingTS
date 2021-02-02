import { Component, OnInit } from '@angular/core';
import { Roles, TableModel, User } from './app.model';
import "reflect-metadata";
import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'training';
  users: User[] = [];
  table: TableModel<User> = new TableModel();
  buttonState: 'Load' | 'Refresh' = 'Load';
  tempUser: any;
  roles = Roles;
  constructor(private crud: CrudService<User>) { }

  ngOnInit() {
  }


  buttonClick() {
    this.loadUsers();
    this.buttonState = 'Refresh';
  }

  toggleEdit(user: User) {
    this.tempUser = Object.assign({}, user);
    user.editable = true;
  }

  updateUser(email: string) {
    this.crud.update(this.tempUser, email).subscribe(result => {
      this.loadUsers();
      this.tempUser = { email: '', firstName: '', role: '' };;
    })
  }

  deleteUser(email: string) {
    this.crud.delete(email).subscribe(result => {
      this.loadUsers();
    })
  }

  loadUsers() {
    this.crud.read().subscribe(result => {
      this.users = result.map(v => new User(v));
      if (this.users[0])
        this.createTable(this.users[0])
    }, err => {
      this.users = [];
    })
  }

  createTable(sampleInstance: User) {
    this.table.columns = Object.getOwnPropertyNames({ ...sampleInstance, ...Reflect.getPrototypeOf(sampleInstance) }).map((k: string) => {
      return {
        name: this.camelCaseToHeader(k),
        readonly: ['email', 'modifiedOn', 'createdOn'].indexOf(k) !== -1,
        id: k as keyof User,
        map: (e:any) => {
          return k === 'role' ? Roles[e as unknown as Roles] : e
        }
      }
    })
    console.log(this.table.columns);
  }

  camelCaseToHeader(str: string) {
    let r = '';
    let state = 0;
    for (let c of str) {
      switch (state) {
        case 0:
          r = r + c.toUpperCase();
          state = 1;
          break;
        case 1:
          if (c === c.toUpperCase()) {
            r = r + ' ' + c;
          }
          else {
            r = r + c;
          }
      }
    }
    return r;
  }
}
