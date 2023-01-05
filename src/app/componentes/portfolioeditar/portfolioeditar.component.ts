import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-portfolioeditar',
  templateUrl: './portfolioeditar.component.html',
  styleUrls: ['./portfolioeditar.component.css']
})
export class PortfolioeditarComponent implements OnInit {
  banModalAcercaDe:boolean=false;
  banExperienciaEditar:boolean=false;
  banEducacionEditar:boolean=false;
  banProyectoEditar:boolean=false;
  banCompetenciaEditar:boolean=false;
  banCompetenciaAgregar:boolean=false;
  banCompetenciaEliminar:boolean=false;
  banPersonaEditar:boolean=false;
  banRedesSocialesEditar:boolean=false;
  banRedesSocialesAgregar:boolean=false;
  banRedesSocialesEliminar:boolean=false;
  banPersonaEliminar:boolean=false;
  Experienciaid:number;
  Educacionid:number;
  ProyectoId:number;
  constructor() { }

  ngOnInit(): void {
  }
  evento(ban:boolean){
    this.banModalAcercaDe=ban;
  }
  eventoExperiencia(ban:boolean){
    this.banExperienciaEditar=ban;
  }
  editarExp(id:number){
    this.banExperienciaEditar=true;
    this.Experienciaid=id;
  }
  eventoEducacion(ban:boolean){
    this.banEducacionEditar=false;
  }
  agregarEdu(id:number){
    this.Educacionid=id;
    this.banEducacionEditar=true;

  }
  editarproyecto(id:number){
    this.ProyectoId=id;
    this.banProyectoEditar=true;
  }
  eventoProyecto(ban:boolean){
    this.banProyectoEditar=ban;
  }
  eventoCompetencia(estado:string){
    if(estado=="agregar"){
      this.banCompetenciaAgregar=true;
    }
    if(estado=="editar"){
      this.banCompetenciaEditar=true;
    }
    if (estado=="eliminar"){
      this.banCompetenciaEliminar=true;
    }
  }
  cerrarCompentencia(tipo:string){
    if(tipo=="agregar"){
      this.banCompetenciaAgregar=false;
    }
    if(tipo=="editar"){
      this.banCompetenciaEditar=false;
    }
    if (tipo=="eliminar"){
      this.banCompetenciaEliminar=false;
    }
  }
  cerrarPersona(ban:boolean){
    this.banPersonaEditar=ban;
  }
  redessociales(estado:string){
    if(estado=="agregar"){
      this.banRedesSocialesAgregar=true;
    }
    if(estado=="editar"){
      this.banRedesSocialesEditar=true;
    }
    if (estado=="eliminar"){
      this.banRedesSocialesEliminar=true;
    }
  }
  cerrarAgregarRedesSociales(ban:boolean){
    this.banRedesSocialesAgregar=ban;
  }
  cerrarEditarRedesSociales(ban:boolean){
    this.banRedesSocialesEditar=ban;
  }
  cerrarEliminarRedesSociales(ban:boolean){
    this.banRedesSocialesEliminar=ban;
  }
  cerrareliminarPersona(ban:boolean){
    this.banPersonaEliminar=ban;
  }
  cerrareditarpersona(ban:boolean){
    this.banPersonaEliminar=ban;
  }
}
