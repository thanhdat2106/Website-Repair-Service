import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TinTuc } from 'src/app/Models/TinTuc';
import { TinTucLoaiDV } from 'src/app/Models/TinTucLoaiDV';

@Injectable({
  providedIn: 'root'
})
export class TintucServicesService {

  private apiUrl = 'http://localhost:56179/api/TinTuc';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute ) { }
  getAll():Observable<TinTucLoaiDV[]>{
    return this.httpClient.get<TinTucLoaiDV[]>('http://localhost:56179/api/TinTuc/GetAll');
  }
  getSix():Observable<TinTuc[]>{
    return this.httpClient.get<TinTuc[]>('http://localhost:56179/api/TinTuc/GetSix');
  }
  get():Observable<TinTuc[]>{
    return this.httpClient.get<TinTuc[]>(this.apiUrl);
  }
  getAllByID(id: Number):Observable<TinTuc[]>{
    return this.httpClient.get<TinTuc[]>('http://localhost:56179/api/TinTuc/GetAllByID/'+id);
  }
  getByID(id: Number):Observable<TinTuc>{
    return this.httpClient.get<TinTuc>(this.apiUrl+'/'+id);
  }
  Post(tintuc : TinTuc) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.httpClient.post<TinTuc>("http://localhost:56179/api/TinTuc/",tintuc,httpOptions)
  } 
  Put(tintuc: TinTuc): Observable<TinTuc>
  {
    return this.httpClient.put<TinTuc>("http://localhost:56179/api/TinTuc/"+tintuc.maTT,tintuc);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete("http://localhost:56179/api/TinTuc/"+id);
  }
}
