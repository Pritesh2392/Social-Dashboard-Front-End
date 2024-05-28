import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://localhost:5230/api/User/';

  Create_User(user: any)
  {
    return this.http.post<any>(`${this.apiUrl}Create_User`, user);
  }

  Login_User(login:any)
  {
    return this.http.post<any>(`${this.apiUrl}Login_User`, login);
  }

  Save_SocialMediaDetail(UserSocialMediaDetails:any)
  {
    console.log(UserSocialMediaDetails);
    return this.http.post<any>(`${this.apiUrl}Save_SocialMediaDetail`, UserSocialMediaDetails);
  }

  Get_SocialMediaDetail(UserID:number)
  {
    
    return this.http.post<any>(`${this.apiUrl}Get_SocialMediaDetail`, UserID);
  }

}