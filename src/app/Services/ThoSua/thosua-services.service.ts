import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ThoSua } from 'src/app/Models/ThoSua';

@Injectable({
  providedIn: 'root'
})
export class ThosuaServicesService {

  private apiUrl = 'http://localhost:56179/api/ThoSua';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute ) { }
  getAll():Observable<ThoSua[]>{
    return this.httpClient.get<ThoSua[]>(this.apiUrl);
  }
  getByID(id: number):Observable<ThoSua>{
    return this.httpClient.get<ThoSua>(this.apiUrl+'/'+id);
  }
  Post(thosua : ThoSua) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    console.log(thosua);
    return this.httpClient.post<ThoSua>("http://localhost:56179/api/ThoSua/",thosua,httpOptions)
  } 
  Put(thosua: ThoSua): Observable<ThoSua>
  {
    return this.httpClient.put<ThoSua>("http://localhost:56179/api/ThoSua/",thosua);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete("http://localhost:56179/api/ThoSua/"+id);
  }
}
