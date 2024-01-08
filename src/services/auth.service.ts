import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  apiurl='http://localhost:3000/user';

  public RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }
  public GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  public updatePassword(id: any, newPassword: string): Observable<any> {
    const url = `${this.apiurl}/${id}/password`;
    return this.http.patch(url, { newPassword });
  }
  public Getall(){
    return this.http.get(this.apiurl);
  }
  public updateuser(id: any, inputdata: any): Observable<any> {
    const url = `${this.apiurl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.patch(url, inputdata, { headers });
  }
  public getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  public isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  public getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
}