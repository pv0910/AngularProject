import { Component,DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title="Learning Management System";
  isadmin=false;
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
