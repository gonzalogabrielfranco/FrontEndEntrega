import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ExperienciaService } from '../../shared/servicios/experiencia.service';
import { ExperienciaModel } from '../../shared/modelo/experiencia.model';
import {AutenticacionService} from "../../shared/servicios/autenticacion.service";
import {usuarioModel} from "../../shared/modelo/usuario.model";
import {ImagenesService} from "../../shared/servicios/imagenes.service";
import {FechaService} from "../../shared/servicios/fecha.service";

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  @Output() editarExperiencia= new EventEmitter<number>();
  experienciaslista: ExperienciaModel[] = [];
  esAdmin:boolean=false;
  user:usuarioModel;
  constructor(private experienciaserice:ExperienciaService,private aut:AutenticacionService, private imageneservice:ImagenesService,private fechaservicio:FechaService) { }

  ngOnInit(): void {
    this.experienciaserice.getExperiencias().subscribe(data=>{
      this.experienciaslista=data;
      for (let i=0;i<this.experienciaslista.length;i++){
        if (this.experienciaslista[i].urlImagen==""){
          this.experienciaslista[i].urlImagen="/assets/imagenes/experiencia/experienciadefault.png";
        }
      }
    });
    this.user=this.aut.getUsuarioAutenticado();
    if(this.user!=null ){
      this.esAdmin=true;
    }else{
      this.esAdmin=false;
    }
  }
  editar(id:number){
    this.editarExperiencia.emit(id);
  }
  eliminar(id:number){
    if(window.confirm("¿Estas seguro de eliminar esta experiencia?"))
    {
      this.experienciaserice.getExperiencia(id).subscribe(data=>{
        if(data.urlImagen!=""){
          this.imageneservice.eliminarImagen(data.urlImagen);
        }
        this.experienciaserice.eliminarExperiencia(id).subscribe(res=>{
          alert("Experiencia eliminada");
          window.location.reload();
        });
      });

    }

  }
  agregar(){
    this.editarExperiencia.emit(-1);
  }
  calculoExperiencia(fechaInicio:string,fechaFin:string):string{
    return this.fechaservicio.calculoExperiencia(fechaInicio,fechaFin);
  }
  convertirfechastring(fecha:string):string{
    if (fecha!="Actualidad"){
    return this.fechaservicio.devolverNombreString(fecha);
  }else{
      return fecha;
    }
}
}
