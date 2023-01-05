import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PersonaService} from "../../shared/servicios/persona.service";
import {personaModel} from "../../shared/modelo/persona.model";
import {usuarioModel} from "../../shared/modelo/usuario.model";
import {AutenticacionService} from "../../shared/servicios/autenticacion.service";
import {FechaService} from "../../shared/servicios/fecha.service";

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {
  @Output() editarPotada= new EventEmitter<boolean>();
  @Output() eliminarPersona = new EventEmitter<boolean>();
  persona:personaModel;
  esAdmin:boolean=false;
  user:usuarioModel;
  constructor(private personaservice:PersonaService,private aut:AutenticacionService, private fecha:FechaService) { }

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
          this.guardar();
        } else{
        this.persona=data[0];
      }

      if (this.persona.urlImagenPortada == null || this.persona.urlImagenPortada == "") {
        this.persona.urlImagenPortada="/assets/imagenes/portada/fondo-portada.webp";
      }
      if (this.persona.urlImagenPerfil == null || this.persona.urlImagenPerfil == "") {
        this.persona.urlImagenPerfil="/assets/imagenes/portada/foto-perfil-1.png";
      }
    });
    this.user=this.aut.getUsuarioAutenticado();
    if(this.user!=null ){
      this.esAdmin=true;
    }else{
      this.esAdmin=false;
    }
    console.log(this.fecha.calculodefechaedad("1997-5-6"));

  }
  editar(){
    this.editarPotada.emit(true);
  }
  eliminar(){
    this.eliminarPersona.emit(true);
  }
  guardar(){
    this.personaservice.guardarPersona(this.persona).subscribe(data=>{
    });
  }

}
