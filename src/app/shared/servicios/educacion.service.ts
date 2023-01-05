import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {educacionModel} from "../modelo/educacion.model";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  url="https://portfoliobackend-gonzalogabrielfranco.koyeb.app";
  constructor(private http:HttpClient) { }
  getEducacion():Observable<educacionModel[]>{
    return this.http.get<educacionModel[]>(this.url+'/api/educacion/traer');
  }
  getEducacionId(id:number):Observable<educacionModel>{
    return this.http.get<educacionModel>(this.url+'/api/educacion/buscar?id='+id);
  }
  guardarEducacion(educacion:any):Observable<educacionModel>{
    return this.http.post<educacionModel>(this.url+'/api/educacion/guardar',educacion);
  }
  actualizarEducacion(educacion:any):Observable<educacionModel>{
    return this.http.put<educacionModel>(this.url+'/api/educacion/actualizar',educacion);
  }
  eliminarExperiencia(id:number):Observable<educacionModel>{
    return this.http.delete<educacionModel>(this.url+'/api/educacion/borrar?id='+id);
  }
}
