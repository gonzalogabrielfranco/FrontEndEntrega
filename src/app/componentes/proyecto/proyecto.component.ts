import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProyectoService} from "../../shared/servicios/proyecto.service";
import {proyectoModel} from "../../shared/modelo/proyecto.model";
import {AutenticacionService} from "../../shared/servicios/autenticacion.service";
import {ImagenesService} from "../../shared/servicios/imagenes.service";
import {FechaService} from "../../shared/servicios/fecha.service";
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  @Output() editarProyecto= new EventEmitter<number>();
  listaproyectos:proyectoModel[]=[];
  esAdmin:boolean=false;

  id:number=-1;
  constructor(private proyectoservice:ProyectoService,private aut:AutenticacionService,private imageservice:ImagenesService,private fechaservicio:FechaService) { }
  ngOnInit(): void {
    this.getProyectos();
    if(this.aut.getUsuarioAutenticado()!=null){
      this.esAdmin=true;
    }else {
      this.esAdmin=false;
    }
  }
  getProyectos(){
    this.proyectoservice.getProyectos().subscribe(data=>{
      this.listaproyectos=data;
      for (let i=0;i<this.listaproyectos.length;i++){
        if (this.listaproyectos[i].urlImagen==""){
          this.listaproyectos[i].urlImagen="/assets/imagenes/poryectos/logo-proyecto-default.png";
        }
      }
    });
  }
  editar(id:number){
    this.editarProyecto.emit(id);
  }
  eliminar(id:number){
    let proyecto:proyectoModel;
    if(window.confirm("¿Estas seguro de eliminar esta Titulo?"))
    {
      this.proyectoservice.GetProyectoId(id).subscribe(data=>{
        proyecto=data;
        this.proyectoservice.EliminarProyecto(id).subscribe(res=>{
          if (proyecto.urlImagen!=""){
            this.imageservice.eliminarImagen(proyecto.urlImagen);
          }
          alert("Experiencia eliminada");
          window.location.reload();
        });
      });
    }
  }
  convertirfechastring(fecha:string):string{
    if (fecha!="Actualidad"){
      return this.fechaservicio.devolverNombreString(fecha);
    }else{
      return fecha;
    }
  }
}

