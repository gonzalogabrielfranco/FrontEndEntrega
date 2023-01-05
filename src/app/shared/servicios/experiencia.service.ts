import { Injectable } from '@angular/core';
import { ExperienciaModel } from '../modelo/experiencia.model';
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http:HttpClient) { }
  url="https://portfoliobackend-gonzalogabrielfranco.koyeb.app";
  getExperiencias():Observable<ExperienciaModel[]>{
    return this.http.get<ExperienciaModel[]>(this.url+'/api/experiencia/traer');
  }
  guardarExperiencia(experiencia:any):Observable<ExperienciaModel>{
    return this.http.post<ExperienciaModel>(this.url+'/api/experiencia/guardar', experiencia);
  }
  eliminarExperiencia(id:number):Observable<ExperienciaModel>{
    return this.http.delete<ExperienciaModel>(this.url+'/api/experiencia/borrar?id='+id);
  }
  getExperiencia(id:number):Observable<ExperienciaModel>{
    return this.http.get<ExperienciaModel>(this.url+'/api/experiencia/buscar?id='+id);
  }
  actualizarExperiencia(experiencia:any):Observable<ExperienciaModel>{
    return this.http.put<ExperienciaModel>(this.url+'/api/experiencia/actualizar', experiencia);
  }
}
