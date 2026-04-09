import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  AlertController, IonCard } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
  ],
  templateUrl: './home.page.html'
})
export class HomePage {
  constructor(private alertController: AlertController) {}

  async showWelcomeAlert() {
    const alert = await this.alertController.create({
      header: 'Welcome',
      subHeader: 'Ionic App',
      message: 'Hello! This is a simple Ionic alert.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showDeleteAlert() {
    const alert = await this.alertController.create({
      header: 'Delete Student',
      message: 'Are you sure you want to delete this student?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Student deleted');
          }
        }
      ]
    });

    await alert.present();
  }
}
