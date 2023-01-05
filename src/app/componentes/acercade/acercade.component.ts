import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PersonaService} from "../../shared/servicios/persona.service";
import {personaModel} from "../../shared/modelo/persona.model";
import {HttpClient} from "@angular/common/http";
import {AutenticacionService} from "../../shared/servicios/autenticacion.service";
import {usuarioModel} from "../../shared/modelo/usuario.model";
import {RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  persona:personaModel;
  esAdmin:boolean=false;
  url:string;
  user:usuarioModel;
  @Output() editarmostrar= new EventEmitter<boolean>();
  constructor(private http:HttpClient,private personaservice:PersonaService,private aut:AutenticacionService) { }

  ngOnInit(): void {
    this.personaservice.getPersonas().subscribe((data:personaModel[])=>{
      if (data.length==0){
        this.persona={
          id: 1,
          nombre: "Nombre",
          apellido: "Apellido",
          email: "",
          titulo: "",
          fechaNacimiento: "",
          residencia: "",
          descripcion: "",
          urlImagenPerfil: "",
          urlImagenPortada: "",
          proyectos: [],
          educacion: [],
          hardandsoftskill: [],
          redesSociales: []
        }
      } else{
        this.persona=data[0];
      }
    });
    this.user=this.aut.getUsuarioAutenticado();

    if(this.user!=null ){
       this.esAdmin=true;
     }else{
       this.esAdmin=false;
     }
  }
  editar(){
    this.editarmostrar.emit(true);
  }
  eliminar(){

    if(confirm("¿Está seguro de eliminar la descripción?")){
      this.persona.descripcion="";
      this.personaservice.actualizarPersona(this.persona).subscribe((data)=>{
        alert("Se elimino correctamente");
        window.location.reload();
      });
    }

  }

}
