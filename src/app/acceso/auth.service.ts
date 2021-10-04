import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Acceso} from './acceso';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _acceso: Acceso;
  private _token:string;



  constructor(private http: HttpClient) { }

public get acceso():Acceso{
  if(this._acceso!=null){
    return this._acceso;
  }else if(this._acceso == null && sessionStorage.getItem('acceso')!=null){
    this._acceso=JSON.parse (sessionStorage.getItem('acceso')) as Acceso;
    return this._acceso;
  }
}

public get token():string{
  if(this._token!=null){
    return this._token;
  }else if(this._token == null && sessionStorage.getItem('acceso')!=null){
    this._token=sessionStorage.getItem('acceso');
    return this._token;
  }

}
  login(acceso:Acceso):Observable<any>{

    const urlEndpoint= 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp'+':'+'12345');

    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
  'Authorization':'Basic '+ credenciales});

  let params = new URLSearchParams();

  params.set('grant_type','password');
  params.set('username', acceso.usuario);
  params.set('password', acceso.password);

console.log(params.toString());

    return this.http.post<any>(urlEndpoint, params.toString(), {headers:httpHeaders});

  }

guardarAcceso(accessToken:string):void{
let payload= this.obtenerDatosToke(accessToken);
  this._acceso=new Acceso();
  this._acceso.usuario=payload.usuario;

  sessionStorage.setItem('acceso',JSON.stringify(this._acceso));

}

guardarToken(accessToken:string):void{
this._token =accessToken;
sessionStorage.setItem('token',accessToken);
}

obtenerDatosToke(accessToke:string):any{
  if(accessToke!=null){
    return JSON.parse(atob(accessToke.split(".")[1]));
  }
}
logout():void{
  this._token=null;
  this._acceso=null;

sessionStorage.clear();

}

}
