import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HardsoftskillService} from "../../shared/servicios/hardsoftskill.service";
import {HardandsoftskillModel} from "../../shared/modelo/hardandsoftskill.model";
import {AutenticacionService} from "../../shared/servicios/autenticacion.service";
@Component({
  selector: 'app-hardandsoftskill',
  templateUrl: './hardandsoftskill.component.html',
  styleUrls: ['./hardandsoftskill.component.css']
})
export class HardandsoftskillComponent implements OnInit {

  esAdmin:boolean=false;
  hardsofskilllista:HardandsoftskillModel[]=[];
  @Output() editarcompentecia= new EventEmitter<string>();
  constructor(private hardsofskillservice:HardsoftskillService, private aut:AutenticacionService) { }
  ngOnInit(): void {
    this.hardsofskillservice.getHardsoftskill().subscribe(data=>{
      if (data.length!=0){
        this.hardsofskilllista=data;
      }else{
        this.hardsofskilllista=[];
      }

    });
    if(this.aut.getUsuarioAutenticado().token!=""){
      this.esAdmin=true;
    }else{
      this.esAdmin=false;
    }
  }
  agregarCompetencia(){
    this.editarcompentecia.emit("agregar");
  }
  editarCompetencia(){
    this.editarcompentecia.emit("editar");
  }
  eliminarCompetencia(){
    this.editarcompentecia.emit("eliminar");
  }

}
