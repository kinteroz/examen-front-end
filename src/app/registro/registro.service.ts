import { Injectable } from '@angular/core';
import { REGISTROS } from './registros.jason';
import { Registro} from './registro';
import { of, Observable } from 'rxjs';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import {map,tap} from 'rxjs/operators';
import {AuthService} from '../acceso/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlEndPoint:string ="http://localhost:8080/api/registros";

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient,
  private authService:AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization', 'Bearer '+token );
    }
  return this.httpHeaders;
  }


  getRegistros(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page,{headers:this.agregarAuthorizationHeader()}).pipe(

      tap((response:any)=>{
        console.log('RegistroService: tap 1');
        (response.content as Registro[]).forEach(registro=>{
          console.log(registro.usuario);
        });
      }),

    
      tap((response:any)=>{
        console.log('RegistroService: tap 2');
        (response.content as Registro[]).forEach(registro=>{
          console.log(registro.usuario);
        });
      })
    );
  }
}
