import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { map, switchMap } from 'rxjs/operators';
import { IonContent } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera/dist/esm/';
  
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chatId = null;
  currentUserId = null;
  users = null;
  chatInfo = null;
  msg = '';
  messages = [];

  @ViewChild(IonContent) content: IonContent;

  scrollPercentage = 0;

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('chatid');
    this.currentUserId = this.authService.getUserId();

    this.chatService.getChatInfo(this.chatId).pipe(
      switchMap(info => {
        this.users = {};
        this.chatInfo = info;

        for (let user of info['users']) {
          this.users[user.id] = user.email;
        }
        
        return this.chatService.getChatMessages(this.chatId);
      }),
      map(messages => {
        return messages.map(msg => {
          msg['fromUser'] = this.users[msg['from']] || 'Deleted';
          return msg;
        })
      }) 
    ).subscribe(res => {
      for (let m of res) {
        if (this.messages.filter(msg => msg.id == m['id']).length == 0) {
          this.messages.push(m);
        }
      }
      setTimeout(() => {
        this.content.scrollToBottom(400);
      }, 400);
    })
    
  }

  sendMessage() {
    this.chatService.addMessage(this.chatId, this.msg).then(_ => {
      this.msg = '';
      this.content.scrollToBottom(300)
    });
  }

  async contentScrolled(ev) {
    const scrollElement = await this.content.getScrollElement();
    const scrollPosition = ev.detail.scrollTop;
    const totalContentHeight = scrollElement.scrollHeight;

    this.scrollPercentage = scrollPosition / (totalContentHeight - ev.target.clientHeight) + 0.001;
  }

  scrollDown() {
    this.content.scrollToBottom(300);
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      source: CameraSource.Photos,
      resultType: CameraResultType.Base64
    });

    if (image) {
      this.chatService.addFileMsg(image.base64String, this.chatId);
    }
  }

  leaveChat() {
    this.chatService.leaveChat(this.chatId).then(_ => {
      this.router.navigateByUrl('/overview');
    });
  }

}
 