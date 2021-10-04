import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable } from 'rxjs'
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http'
import {map} from 'rxjs/operators';
import {AuthService} from '../acceso/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

private urlEndPoint:string ="http://localhost:8080/api/usuario";

private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

constructor(private http: HttpClient,
private authService:AuthService) { }

private agregarAuthorizationHeader(){
  let token = this.authService.token;
  if(token!=null){
    return this.httpHeaders.append('Authorization', 'Bearer '+token );
  }
return this.httpHeaders;
}

public  getUsuarios(page:number):Observable<any>{

  return this.http.get<any>(this.urlEndPoint+'/page/'+page,{headers:this.agregarAuthorizationHeader()}).pipe(
    map((response:any)=>response.content as Usuario[])

  );
  }
}
