import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { HistoryPage } from '../history/history';
import { EditPage } from '../edit/edit';
import { AddPage } from '../add/add';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';
import { TodoProvider } from '../../providers/todo/todo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos = [];

  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController, public todoService:TodoProvider) {
    let loader = this.loadingCtrl.create({
      content: "Todo loading..."
    })

    loader.present();
    this.todoService.getTodo().then((res: any) =>{
      loader.dismiss();
      this.todos = res;
    })

  }

  btnHistory(){
    this.navCtrl.push(HistoryPage);
  }

  confirmDelete(id){
    let loader = this.loadingCtrl.create({
      content: "Delete loading..."
    })

    let toast = this.toastCtrl.create({
      message: "Delete success",
      duration: 3000
    })

    let alert = this.alertCtrl.create({
      buttons: ["Dismiss"]
    })

    loader.present();
    this.todoService.deleteTodo(id).then((res: any) =>{
      if(res.success){
        loader.dismiss();
        toast.present();
        this.navCtrl.setRoot(HomePage);
      }
      else{
        loader.dismiss();
        alert.setMessage(res);
        alert.present();
      }
    })
  }

  btnDelete(id){
    let confirm = this.alertCtrl.create({
      message: 'Are your agree to delete this todo?',
      buttons: [
        {
          text: 'Disagree'
        },
        {
          text: 'Agree',
          handler: () => {
            this.confirmDelete(id);
          }
        }
      ]
    });
    confirm.present();
  }

  btnEdit(id){
    this.navCtrl.push(EditPage, {editID: id});
  }

  btnDone(id){
    let loader = this.loadingCtrl.create({
      content: "Status Loading..."
    })

    let toast = this.toastCtrl.create({
      message: "Status change",
      duration: 3000
    })

    let alert = this.alertCtrl.create({
      buttons: ["Dismiss"]
    })

    loader.present();
    this.todoService.doneTodo(id).then((res: any) =>{
      if(res.success){
        loader.dismiss();
        toast.present();
        this.navCtrl.setRoot(HomePage);
      }
      else{
        loader.dismiss();
        alert.setMessage(res);
        alert.present();
      }
    })
  }

  btnAdd(){
    this.navCtrl.push(AddPage);
  }

  btnSignout(){
    let loader = this.loadingCtrl.create({
      content: "Signout loading..."
    })

    let toast = this.toastCtrl.create({
      message: "Signout success",
      duration: 3000
    })

    let alert = this.alertCtrl.create({
      buttons: ["Dismiss"]
    })

    loader.present();
    this.authService.signout().then((res: any) =>{
      if(res.success){
        loader.dismiss();
        toast.present();
        this.navCtrl.setRoot(SigninPage);
      }
      else{
        loader.dismiss();
        alert.setMessage(res);
        alert.present();
      }
    })
  }

}
