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

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }
  GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  updatePassword(id: any, newPassword: string): Observable<any> {
    const url = `${this.apiurl}/${id}/password`;
    return this.http.patch(url, { newPassword });
  }
  Getall(){
    return this.http.get(this.apiurl);
  }
  updateuser(id: any, inputdata: any): Observable<any> {
    const url = `${this.apiurl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.patch(url, inputdata, { headers });
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
}