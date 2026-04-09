import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonButton,
  ToastController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonToggle,
    IonButton
  ],
  templateUrl: './settings.page.html'
})
export class SettingsPage {
  username = '';
  email = '';
  notifications = true;

  constructor(private toastController: ToastController) {}

  onUsernameInput(event: any) {
    this.username = event.detail.value ?? '';
  }

  onEmailInput(event: any) {
    this.email = event.detail.value ?? '';
  }

  onNotificationsChange(event: any) {
    this.notifications = event.detail.checked;
  }

  async saveSettings() {
    const toast = await this.toastController.create({
      message: 'Settings saved successfully!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }
}
