import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StartGroupModalPage } from '../start-group-modal/start-group-modal.page';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  chats = [];
  subscriptions = new Subscription();

  constructor(private authService: AuthService, private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet, private chatService: ChatService) { }

  ngOnInit() {
    this.loadChats();
  }

  loadChats() {
    const chatSub = this.chatService.getUserChats().subscribe(res => {
      this.chats = res;
    });
    this.subscriptions.add(chatSub);
  }

  async startGroup() {
    const modal = await this.modalCtrl.create({
      component: StartGroupModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      if (data.action == 'single') {
        await this.chatService.startChat(data.user);
      } else if (data.action == 'group') {
        await this.chatService.startGroup(data.name, data.users);
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
