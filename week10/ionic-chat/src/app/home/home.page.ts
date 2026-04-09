import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonText,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Contact {
  id: number;
  name: string;
  status: string;
  avatar: string;
}

interface Message {
  sender: 'me' | 'them';
  text: string;
  time: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonText,
    IonInput,
    IonButton,
    IonIcon,
    FormsModule,
    CommonModule
  ],
})
export class HomePage {
  searchTerm = '';
  newMessage = '';

  contacts: Contact[] = [
    {
      id: 1,
      name: 'Mariam',
      status: 'Online',
      avatar: 'https://i.pravatar.cc/100?img=32'
    },
    {
      id: 2,
      name: 'Youssef',
      status: 'Last seen 10 min ago',
      avatar: 'https://i.pravatar.cc/100?img=12'
    },
    {
      id: 3,
      name: 'Salma',
      status: 'Typing...',
      avatar: 'https://i.pravatar.cc/100?img=47'
    },
    {
      id: 4,
      name: 'Omar',
      status: 'Offline',
      avatar: 'https://i.pravatar.cc/100?img=15'
    }
  ];

  selectedContact: Contact = this.contacts[0];

  conversations: Record<number, Message[]> = {
    1: [
      { sender: 'them', text: 'Hey! How is the app going?', time: '10:12 AM' },
      { sender: 'me', text: 'Pretty well. Building the UI first.', time: '10:13 AM' },
      { sender: 'them', text: 'Nice. Start simple.', time: '10:14 AM' }
    ],
    2: [
      { sender: 'them', text: 'Did you test the new layout?', time: '9:01 AM' },
      { sender: 'me', text: 'Not yet, I am setting up the page.', time: '9:05 AM' }
    ],
    3: [
      { sender: 'them', text: 'Can we make it look like WhatsApp a little?', time: 'Yesterday' }
    ],
    4: [
      { sender: 'me', text: 'Let us add backend later.', time: 'Yesterday' },
      { sender: 'them', text: 'Yep, mock data first is better.', time: 'Yesterday' }
    ]
  };

  get filteredContacts(): Contact[] {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      return this.contacts;
    }

    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(term)
    );
  }

  get activeMessages(): Message[] {
    return this.conversations[this.selectedContact.id] || [];
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  sendMessage() {
    const text = this.newMessage.trim();

    if (!text) {
      return;
    }

    this.conversations[this.selectedContact.id].push({
      sender: 'me',
      text,
      time: 'Now'
    });

    this.newMessage = '';
  }
}
