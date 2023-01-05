import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {personaModel} from "../modelo/persona.model";
import {Observable, of} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient) { }
  url="https://portfoliobackend-gonzalogabrielfranco.koyeb.app";
  getPersonas():Observable<personaModel[]>{
    return this.http.get<personaModel[]>(this.url+'/api/persona/traer');
  }
  actualizarPersona(persona:any):Observable<personaModel>{
    return this.http.put<personaModel>(this.url+'/api/persona/actualizar',persona);
  }
  guardarPersona(persona:any):Observable<personaModel>{
    return this.http.post<personaModel>(this.url+'/api/persona/guardar',persona);
  }
}
