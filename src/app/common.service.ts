import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly url = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  // Add or Update user
  AddupdateUser(user: any, type: string): Observable<any> {
    if (type === 'add') {
      return this.http.post(this.url + "users", user);  // Add new user
    } else {
      return this.http.put(this.url + "users/" + user.id, user);  // Update existing user
    }
  }
  

  
  GetAllUser(): Observable<any> {
    return this.http.get(this.url + "users");
  }

  // Delete user by ID
  DeleteUserById(id: any): Observable<any> {
    return this.http.delete(this.url + "users/" + id);
  }

  // Get user by ID
  GetUserById(id: any): Observable<any> {
    return this.http.get(this.url + "users/" + id);
  }
}
