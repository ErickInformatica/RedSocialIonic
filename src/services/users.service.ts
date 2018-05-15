import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../models/users.model';


import { GLOBAL } from './global.service';



@Injectable ()
export class UsersService{
    public url:string;
    public identity;
    public token;
    public stats;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    register(user: Users): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'register', params, {headers: headers});
    }

    singup(user, gettoken = null): Observable<any>{
        if(gettoken != null){
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }

    getIdentity(){
        var identity = JSON.parse(sessionStorage.getItem('identity'));
        
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = sessionStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    getStats(){
        let stats = JSON.parse(sessionStorage.getItem('stats'));

        if(stats != "undefined"){
            this.stats = stats;
        }else{
            this.stats = null;
        }

        return this.stats;
    }

    getCounters(userId = null): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());
        
        if(userId != null){
            return this._http.get(this.url+'counters/'+userId, {headers: headers});
        }else{
            return this._http.get(this.url+'counters', {headers: headers});
        }
    }

    updateUser(user: Users):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers});
    }

    getUsers(page = null):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.get(this.url+'users/'+page, {headers: headers});
    }

    getUsers2():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.get(this.url+'users2', {headers: headers});
    }



    getUser(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.get(this.url+'user/'+id, {headers: headers});
    }

    getPasss(user: Users):Observable<any>{
        console.log( user._id)
       
        let params = JSON.stringify(user);

        console.log("pass2", params);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.post(this.url+'findPassword/'+user._id, params ,{headers: headers});
    }

    updatePass(user: Users):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.put(this.url+'updatePrueba/'+user._id, params, {headers: headers});
    }

}