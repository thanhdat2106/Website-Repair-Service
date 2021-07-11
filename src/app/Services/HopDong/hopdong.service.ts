import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HopDong } from 'src/app/Models/HopDong';

@Injectable({
  providedIn: 'root'
})
export class HopdongService {

  private apiUrl = 'http://localhost:56179/api/HopDong';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<HopDong[]>{
    return this.httpClient.get<HopDong[]>(this.apiUrl);
  }
  getByID(id: number):Observable<HopDong>{
    return this.httpClient.get<HopDong>(this.apiUrl+'/'+id);
  }
  Post(hopdong : HopDong) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  
    return this.httpClient.post<HopDong>("http://localhost:56179/api/HopDong/",hopdong,httpOptions)
  } 
  Put(hopdong: HopDong): Observable<HopDong>
  {
    return this.httpClient.put<HopDong>("http://localhost:56179/api/HopDong/"+hopdong.maHopDong,hopdong);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete("http://localhost:56179/api/HopDong/"+id);
  }
}
