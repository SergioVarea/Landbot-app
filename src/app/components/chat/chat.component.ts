import { Component, OnInit , Input} from '@angular/core';
import * as Landbot from '@landbot/core';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
  core: Landbot;

  chat;
  title = "Landbot Chat Angular";

  constructor() {
    this.chat = {
        messages: [],
        messageValue: ''
    }
  }

  ngOnInit() {
    var parent = this;
    // New message listener.
    this.core.pipelines.$readableSequence.subscribe(data => {
     if (!data.read && !data.action) {
        parent.chat.messages.push(data.message);
      } else if(data.read && parent.chat.messages.indexOf(data.message) == -1){
        parent.chat.messages.push(data.message);
      }
      if (data.action) {
          document.getElementById('control').style.display = "none";
      }
      parent.scrollBottom(document.getElementsByClassName('landbot-chat')[0]);
    });
    this.core.init().then((data) => {
      parent.core.sendMessage({ message: 'hey' })
    });

  }



  submitMessageKeyUp(e) {
    if (this.chat.messageValue && e.keyCode == 13) {
      const parent = this;
      this.core.sendMessage({ message: this.chat.messageValue })
      .then((data) => {

        this.chat.messageValue = '';
      });

    }
  }

  submitMessage() {
    if (this.chat.messageValue) {
      const parent = this;
      this.core.sendMessage({ message: this.chat.messageValue }).then(() => {
        this.core.sendMessage({ message: this.chat.messageValue })
        .then((data) => {
        });
      });
      this.chat.messageValue = '';
    }
  }

  // Utils
  orderedMessages (){
    return this.chat.previewMessages
      .filter(this.messagesFilter)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

 parseMessages(messages) {
   const objMessage = [];
   Object.keys(messages).forEach((messageKey)=> {
     objMessage.push(this.parseMessage(messages[messageKey]));
   })
  return objMessage;
  }

  parseMessage(data) {
    return data.title || data.message;
  }

  /** Support for basic messages */
  messagesFilter(data) {
    return ['text', 'dialog'].includes(data.type);
  }

  scrollBottom(container) {
    container.scrollTop = container.scrollHeight;
  }

}
