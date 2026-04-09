import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  ToastController, IonList, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [IonItem, IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
  ],
  templateUrl: './students.page.html'
})
export class StudentsPage {
  constructor(private toastController: ToastController) {}

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Student added successfully!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }

  async showWarningToast() {
    const toast = await this.toastController.create({
      message: 'Please fill in all required fields.',
      duration: 2500,
      position: 'top',
      color: 'warning'
    });

    await toast.present();
  }
}
