import { Component,DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  public title="Learning Management System";
  public isadmin=false;
  constructor(){}
  public isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  ngDoCheck(): void {
    let role=sessionStorage.getItem('role');

    if (role == 'admin') {
      this.isadmin = true;
    }else{
      this.isadmin = false;
    }
  }
}
