import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DichVu } from 'src/app/Models/DichVu';

@Injectable({
  providedIn: 'root'
})
export class DichvuServicesService {

  private apiUrl = 'http://localhost:56179/api/DichVu';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<DichVu[]>{
    return this.httpClient.get<DichVu[]>(this.apiUrl);
  }
  get():Observable<DichVu[]>{
    return this.httpClient.get<DichVu[]>("http://localhost:56179/api/DichVu/get");
  }
  getByID(id: number):Observable<DichVu>{
    return this.httpClient.get<DichVu>(this.apiUrl+'/'+id);
  }
  Post(dichvu : DichVu) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    console.log(dichvu);
    return this.httpClient.post<DichVu>("http://localhost:56179/api/DichVu/",dichvu,httpOptions)
  } 
  Put(dichvu: DichVu): Observable<DichVu>
  {
    return this.httpClient.put<DichVu>("http://localhost:56179/api/DichVu/"+dichvu.maDV,dichvu);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete("http://localhost:56179/api/DichVu/"+id);
  }
}
