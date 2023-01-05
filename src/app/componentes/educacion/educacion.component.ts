import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EducacionService} from "../../shared/servicios/educacion.service";
import {educacionModel} from "../../shared/modelo/educacion.model";
import {AutenticacionService} from "../../shared/servicios/autenticacion.service";
import {usuarioModel} from "../../shared/modelo/usuario.model";
import {ImagenesService} from "../../shared/servicios/imagenes.service";
import {FechaService} from "../../shared/servicios/fecha.service";

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  @Output() agregareducacion= new EventEmitter<number>();
  @Output() editarEducacion= new EventEmitter<number>();
  esAdmin:boolean=false;
  educacionlista:educacionModel[]=[];
  user:usuarioModel;
  constructor(private servicioEducacion:EducacionService, private aut:AutenticacionService,private imageservicio:ImagenesService,private fechaservicio:FechaService) { }

  ngOnInit(): void {
    this.servicioEducacion.getEducacion().subscribe(data=>{
      this.educacionlista=data;
      if (this.educacionlista.length==0){
        this.educacionlista=[];
      }else{
        for (let i=0;i<this.educacionlista.length;i++){
          if (this.educacionlista[i].urlImagen=="" || this.educacionlista[i].urlImagen==null){
            this.educacionlista[i].urlImagen="/assets/imagenes/educacion/educaciondefault.png";
          }
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
  agregar(){
    this.agregareducacion.emit(-1);
  }
  editar(id:number){
    this.agregareducacion.emit(id);
  }
  eliminar(id:number){
    if(window.confirm("¿Estas seguro de eliminar esta Titulo?"))
    {
      this.servicioEducacion.getEducacionId(id).subscribe(data=>{
        this.servicioEducacion.eliminarExperiencia(id).subscribe(res=>{
          if (data.urlImagen!=""){
            this.imageservicio.eliminarImagen(data.urlImagen);
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
