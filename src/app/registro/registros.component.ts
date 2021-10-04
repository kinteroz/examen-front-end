import { Component, OnInit } from '@angular/core';
import { Registro} from './registro';
import { RegistroService} from './registro.service';
import {AuthService} from '../acceso/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html'
})
export class RegistrosComponent implements OnInit {

  registros: Registro[];
  constructor(private registroService:RegistroService,
  private activatedRoute:ActivatedRoute,private authService:AuthService, private router: Router) { }

  logout():void{
    this.authService.logout();
    swal.fire('Logout', 'Fin de sesion','success');
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {


    this.activatedRoute.paramMap.subscribe( params =>{
        let page:number= +params.get('page');
        if(!page){
          page=0;
        }
      this.registroService.getRegistros(page).subscribe(
        response => this.registros = response.content as Registro[]
      );
    }


    );


  }

}
