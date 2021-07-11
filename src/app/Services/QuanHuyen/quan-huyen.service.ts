import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuanHuyen } from 'src/app/Models/QuanHuyen';

@Injectable({
  providedIn: 'root'
})
export class QuanHuyenService {

  private apiUrl = 'http://localhost:56179/api/QuanHuyen';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<QuanHuyen[]>{
    return this.httpClient.get<QuanHuyen[]>(this.apiUrl);
  }
  getByID(id: number):Observable<QuanHuyen[]>{
    return this.httpClient.get<QuanHuyen[]>(this.apiUrl+'/'+id);
  }

}
