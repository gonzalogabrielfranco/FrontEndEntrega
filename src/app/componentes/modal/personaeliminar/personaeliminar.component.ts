import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {personaModel} from "../../../shared/modelo/persona.model";

import {PersonaService} from "../../../shared/servicios/persona.service";
import {ImagenesService} from "../../../shared/servicios/imagenes.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-personaeliminar',
  templateUrl: './personaeliminar.component.html',
  styleUrls: ['./personaeliminar.component.css']
})
export class PersonaeliminarComponent implements OnInit {

  @Output() eventoPersona = new EventEmitter<boolean>();
  persona:personaModel;

  formulario= new FormGroup(
    {
      datos: new FormControl(''),
      fotoportada: new FormControl(''),
      fotoperfil: new FormControl(''),
    }
  )
  constructor(private personaservicio:PersonaService,private imageservice:ImagenesService) { }

  ngOnInit(): void {
    this.personaservicio.getPersonas().subscribe(
      (data)=>{
        this.persona=data[0];
      });
  }


  cerrarModal(){
    this.eventoPersona.emit(false);
  }
  eliminarfotoportada(){
    let perso:any;
    this.personaservicio.getPersonas().subscribe(
      (data)=>{
        perso={
          id:data[0].id,
          "nombre":data[0].nombre,
          "apellido":data[0].apellido,
          "email":data[0].email,
          "descripcion":data[0].descripcion,
          "residencia":data[0].residencia,
          "titulo":data[0].titulo,
          "urlImagenPerfil":data[0].urlImagenPerfil,
          "urlImagenPortada":"",
        }
        if(data[0].urlImagenPortada!=""){
          this.imageservice.eliminarImagen(data[0].urlImagenPortada);
        }
        this.personaservicio.guardarPersona(perso).subscribe(
          (data)=>{
            alert("Se ha eliminado foto de portada");
            window.location.reload();
          });
      });

  }
  eliminarfotos(){
    let perso:any;
    this.personaservicio.getPersonas().subscribe(
      (data)=>{
        perso={
          id:data[0].id,
          "nombre":data[0].nombre,
          "apellido":data[0].apellido,
          "email":data[0].email,
          "descripcion":data[0].descripcion,
          "residencia":data[0].residencia,
          "titulo":data[0].titulo,
          "urlImagenPerfil":"",
          "urlImagenPortada":""
        }
        if(data[0].urlImagenPerfil!=""){
          this.imageservice.eliminarImagen(data[0].urlImagenPerfil);
        }
        if(data[0].urlImagenPortada!=""){
          this.imageservice.eliminarImagen(data[0].urlImagenPortada);
        }
        this.personaservicio.guardarPersona(perso).subscribe(
          (data)=>{
            alert("Se ha eliminado foto de portada");
            window.location.reload();
          });
      });
  }
  eliminarfotoperfil(){
    let perso:any;
    this.personaservicio.getPersonas().subscribe(
      (data)=>{
        perso={
          id:data[0].id,
          "nombre":data[0].nombre,
          "apellido":data[0].apellido,
          "email":data[0].email,
          "descripcion":data[0].descripcion,
          "residencia":data[0].residencia,
          "titulo":data[0].titulo,
          "urlImagenPerfil":"",
          "urlImagenPortada":data[0].urlImagenPortada
        }
        if(data[0].urlImagenPerfil!=""){
          this.imageservice.eliminarImagen(data[0].urlImagenPerfil);
        }
        this.personaservicio.guardarPersona(perso).subscribe(
          (data)=>{
            alert("Se ha eliminado foto de portada");
            window.location.reload();
          });
      });
  }
  eliminarinformacion(){
    let perso:any;
    this.personaservicio.getPersonas().subscribe(
      (data)=>{
        perso={
          id:data[0].id,
          "nombre":"nombre",
          "apellido":"apellido",
          "email":"",
          "descripcion":data[0].descripcion,
          "residencia":"",
          "titulo":"",
          "urlImagenPerfil":"",
          "urlImagenPortada":""
        }
        if(data[0].urlImagenPortada!=""){
          this.imageservice.eliminarImagen(data[0].urlImagenPortada);
        }
        if(data[0].urlImagenPerfil!=""){
          this.imageservice.eliminarImagen(data[0].urlImagenPerfil);
        }
        this.personaservicio.guardarPersona(perso).subscribe(
          (data)=>{
            alert("Se ha eliminado informacion de portada");
            window.location.reload();
          });
      });
  }
  eliminar(){
    if  (this.formulario.value.datos){
      this.eliminarinformacion();
    }
    if (this.formulario.value.fotoportada && !this.formulario.value.datos && !this.formulario.value.fotoperfil){
      this.eliminarfotoportada();
    }
    if(this.formulario.value.fotoperfil && !this.formulario.value.datos && !this.formulario.value.fotoportada){
      this.eliminarfotoperfil();
    }
    if(this.formulario.value.fotoperfil && this.formulario.value.fotoportada && !this.formulario.value.datos){
      this.eliminarfotos();
    }
    }
}


