import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PersonaService} from "../../shared/servicios/persona.service";
import {personaModel} from "../../shared/modelo/persona.model";
import {RedessocialesService} from "../../shared/servicios/redessociales.service";
import {redesSocialesModel} from "../../shared/modelo/redessociales.model";
import {usuarioModel} from "../../shared/modelo/usuario.model";
import {AutenticacionService} from "../../shared/servicios/autenticacion.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Output() ver=new EventEmitter<boolean>();
  @Output() editar=new EventEmitter<string>();
  esAdmin:boolean=true;
  nombre:string;
  redesSociales: redesSocialesModel[] = [];
  user:usuarioModel;
  nombreBoton:string;
  baneditar:boolean=true;
  banagregar:boolean=true;
  baneliminar:boolean=true;
  constructor(private redessocialesservice:RedessocialesService,private persona:PersonaService,private aut:AutenticacionService) { }

  ngOnInit(): void {
    this.persona.getPersonas().subscribe((data:personaModel[])=>{
      this.nombre=data[0].nombre +" "+ data[0].apellido;
    });
    this.redessocialesservice.getRedesSociales().subscribe((data:redesSocialesModel[])=>{
      this.redesSociales=data;
      if (data.length==0) {
        this.baneliminar=false;
        this.baneditar=false;
      }else if(data.length==6){
        this.banagregar=false;
      }
    });
    this.user=this.aut.getUsuarioAutenticado();

    if(this.user!=null ){
      this.nombreBoton="Logout";
      this.esAdmin=true;
    }else{
      this.nombreBoton="Login";
      this.esAdmin=false;
    }
  }
  loginver(){
    if (this.nombreBoton=="Login") {
      this.ver.emit(true);
    }else{
      this.aut.cerrarSesion();
      window.location.reload();
    }
  }
  editarredessociales(){
    this.editar.emit("editar");
  }
  agregarredessociales(){
    this.editar.emit("agregar");
  }
  eliminarredessociales(){
    this.editar.emit("eliminar");
  }
}
