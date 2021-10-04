import { Component, OnInit } from '@angular/core';
import { Acceso } from './acceso';
import swal from 'sweetalert2'
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Inicio de sesión'
  acceso:Acceso;

  constructor(private authService:AuthService , private router:Router) {
    this.acceso = new Acceso();
  }

  ngOnInit(): void {
  }

  login():void {
    console.log(this.acceso);
    if(this.acceso.usuario==null||this.acceso.password==null){
      swal.fire('Error Login', 'Username o password vacías','error');
    }



    this.authService.login(this.acceso).subscribe(response=>{
      console.log(response);

      this.authService.guardarAcceso(response.access_token);
      this.authService.guardarToken(response.access_token);

      this.router.navigate(['/registros']);
      swal.fire('Login', 'Has iniciado sesion con éxito','success');
    }, err => {
      if (err.status == 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }if (err.status == 401) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    });
  }

}
