import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UsersService]
})
export class LoginPage implements OnInit{
    public user: Users;
    public status:string;
    public identity;
    public token;

    constructor(
      private _userService: UsersService,
      public navCtrl: NavController
    ){
      this.user = new Users("",
        "",
        "",
        "",
        "",
        "",
        "ROLE_USER",
        ""
      );
       
    }
    ngOnInit(){
      console.log('Hola');
    }

    onSubmit(){
      
      this._userService.register(this.user).subscribe(
        (response) =>{
          
          if(response){
            console.log(response.user);
            this.status = 'success';
          }
        },
        error =>{
          console.log(<any>error);
        }
      );

      
    }

    onSubmit2(){
      this._userService.singup(this.user).subscribe(
        response => {
          this.identity = response.user;
          console.log(this.identity);
          if(!this.identity){
            this.status = 'error';
          }else{
            
            //PERSISTIR DATOS DEL USUARIO
            sessionStorage.setItem('identity', JSON.stringify(this.identity));

            //CONSEGUIR TOKEN
            this.getToken();
          }
         
          this.status = 'success';
        },
        error => {
          var erroMessage = <any>error;
          console.log(erroMessage);
          if(erroMessage != null){
            this.status = 'error';
          }
        }
      );
    }

    getToken(){
      this._userService.singup(this.user, 'true').subscribe(
        response => {
          this.token = response.token;
          console.log(this.token);
          if(this.token.length <= 0){
            this.status = 'error';
          }else{
           
            //PERSISTIR DATOS DEL USUARIO
            sessionStorage.setItem('token', this.token);

            //CONSEGUIR LOS CONTADORES O ESTADISTICAS DEL  USUARIO
            this.getCounters();

            
          }
        },
        error => {
          var erroMessage = <any>error;
          console.log(erroMessage);
          if(erroMessage != null){
            this.status = 'error';
          }
        }
      );
    }

    getCounters(){
      
      this._userService.getCounters(this.identity._id).subscribe(
        response => {
          console.log(response);
          sessionStorage.setItem('stats', JSON.stringify(response));
          this.status = "success";
          this.navCtrl.setRoot(TabsPage);
        },
        error =>{
          console.log(<any>error);
        }
      );
    }

  
}
