import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TinhThanh } from 'src/app/Models/TinhThanh';

@Injectable({
  providedIn: 'root'
})
export class TinhthanhService {

  private apiUrl = 'http://localhost:56179/api/TinhThanh';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<TinhThanh[]>{
    return this.httpClient.get<TinhThanh[]>(this.apiUrl);
  }
  getByID(id: number):Observable<TinhThanh>{
    return this.httpClient.get<TinhThanh>(this.apiUrl+'/'+id);
  }

}
