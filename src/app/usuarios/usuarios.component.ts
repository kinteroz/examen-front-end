import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service'
import { ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

usuarios:Usuario[];

  constructor(private service:UsuarioService,
  private activatedRoute:ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params =>{

      let page:number = +params.get('page');

      if(!page){
        page=0;
      }

    this.service.getUsuarios(page)
    .subscribe(response=>this.usuarios=response.content as Usuario[]);
});

  }




}
