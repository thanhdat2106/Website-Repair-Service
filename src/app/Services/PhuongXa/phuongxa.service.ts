import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DiaChi } from 'src/app/Models/DiaChi';
import { PhuongXa } from 'src/app/Models/PhuongXa';

@Injectable({
  providedIn: 'root'
})
export class PhuongxaService {

  private apiUrl = 'http://localhost:56179/api/PhuongXa';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<PhuongXa[]>{
    return this.httpClient.get<PhuongXa[]>(this.apiUrl);
  }
  getByID(id: number):Observable<PhuongXa[]>{
    return this.httpClient.get<PhuongXa[]>(this.apiUrl+'/'+id);
  }
  getAllByID(id: number):Observable<DiaChi>{
    return this.httpClient.get<DiaChi>('http://localhost:56179/api/PhuongXa/GetAllByID/'+id);
  }
}
