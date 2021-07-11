import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaiDV } from '../../Models/LoaiDV';

@Injectable({
  providedIn: 'root'
})
export class LoaidvServicesService {
  private apiUrl = 'http://localhost:56179/api/LoaiDV';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<LoaiDV[]>{
    return this.httpClient.get<LoaiDV[]>(this.apiUrl);
  }
  getByID(id: number):Observable<LoaiDV>{
    return this.httpClient.get<LoaiDV>(this.apiUrl+'/'+id);
  }
  Post(loaidv : LoaiDV) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    console.log(loaidv);
    return this.httpClient.post<LoaiDV>("http://localhost:56179/api/LoaiDV/",loaidv,httpOptions)
  } 
  Put(loaidv: LoaiDV): Observable<LoaiDV>
  {
    return this.httpClient.put<LoaiDV>("http://localhost:56179/api/LoaiDV/"+loaidv.maLoaiDV,loaidv);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete("http://localhost:56179/api/LoaiDV/"+id);
  }
}
