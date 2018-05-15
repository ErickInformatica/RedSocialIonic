import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { UsersService } from '../../services/users.service';
import { FollowService } from '../../services/follow.service';
import { Users } from '../../models/users.model';
import { GLOBAL } from '../../services/global.service';
import { Follow } from '../../models/follow.model';

/**
 * Generated class for the GentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gente',
  templateUrl: 'gente.html',
  providers: [UsersService, FollowService]
})
export class GentePage implements OnInit {
  public identity;
  public url: string;
  public token;
  public page;
  public next_page;
  public prev_page;
  public status;
  public total;
  public pages;
  public users: Users[];
  public follows;
  constructor(
    private _userService: UsersService,
    private _followService: FollowService,
    public navCtrl: NavController
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getUsers();
  }
/*
  actualPage(){
    this._route.params.subscribe(params =>{
      let page = +params['page'];
      this.page = page;

      if(!params['page']){
        page = 1;
      }

      if(!page){
        page = 1;
      }else{
        this.next_page = page+1;
        this.prev_page = page-1;

        if(this.prev_page <= 0){
          this.prev_page = 1;
        }
      }

      //DEVOLVER LISTADO DE USUARIOS

      this.getUsers(page);
    });
  }
*/
    getUsers(){
      this._userService.getUsers2().subscribe(
        response=>{
          console.log(response);
          if(!response.users){
            this.status = 'error'
          }else{
            this.users = response.users;

            this.follows = response.users_following;
            

            
          }
        },
        error=>{
          var errorMessage = <any>error;
          console.log(errorMessage);

          if(errorMessage !=null){
            this.status = 'error';
          }
        }
      );
    }


    public followUserOver;
    mouseEnter(user_id){
      this.followUserOver = user_id;
    }

    mouseLeave(user_id){
      this.followUserOver = 0;
    }

    followUser(followed){
      var follow = new Follow('', this.identity._id, followed);
      
      this._followService.addFollow(this.token, follow).subscribe(
        response=>{
          if(!response.follow){
            this.status= 'error';
          }else{
            this.status = 'success';
            this.follows.push(followed);
            
          }
        },
        error=>{
          var errorMessage = <any>error;
          console.log(errorMessage);

          if(errorMessage !=null){
            this.status = 'error';
          }
        }
      );
    }

    unfollowUser(followed){
      this._followService.deleteFollow(this.token, followed).subscribe(
        response=>{
          var search = this.follows.indexOf(followed);
          if(search != -1){
            this.follows.splice(search, 1);
          }
        },
        error=>{
          var errorMessage = <any>error;
          console.log(errorMessage);

          if(errorMessage !=null){
            this.status = 'error';
          }
        }
      );
    }
}
