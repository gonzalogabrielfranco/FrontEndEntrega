import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {proyectoModel} from "../modelo/proyecto.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  proyectos:proyectoModel[]=[];
  url="https://portfoliobackend-gonzalogabrielfranco.koyeb.app";
  constructor(private http:HttpClient) { }
  getProyectos():Observable<proyectoModel[]>{
    return this.http.get<proyectoModel[]>(this.url+'/api/proyecto/traer');
  }
  EliminarProyecto(id:number):Observable<proyectoModel>{
    return this.http.delete<proyectoModel>(this.url+'/api/proyecto/borrar?id='+id);
  }
  GurdarProyecto(proyecto:any):Observable<proyectoModel>{
    return this.http.post<proyectoModel>(this.url+'/api/proyecto/guardar',proyecto);
  }
  GetProyectoId(id:number):Observable<proyectoModel>{
    return this.http.get<proyectoModel>(this.url+'/api/proyecto/buscar?id='+id);
  }
}
