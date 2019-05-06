import { Component, OnInit, Input } from '@angular/core';
import * as Landbot from '@landbot/core';

@Component({
  selector: 'app-history-chat-component',
  templateUrl: './history-chat.component.html',
  styleUrls: ['./history-chat.component.css']
})
export class HistoryChatComponent implements OnInit {

  @Input()
  core: Landbot;

  chatHistory;
  title = "Landbot History Chat Angular";

  constructor() {
    this.chatHistory = {
        messages: [],
    }
  }

  ngOnInit() {
    // Initializate core
    var parent = this;
    this.core.init().then(function (data) {
      parent.chatHistory.messages = Object.assign(
        [{}],
        parent.chatHistory.messages,
        parent.parseMessages(data.messages),
      );
      //parent.scrollBottom(document.getElementsByClassName('landbot-messages-container')[0]);
    });
  }


  orderedMessages (){
    return this.chatHistory.messages
      .filter(this.messagesFilter)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  // Utils
 parseMessages(messages) {
   const objMessage = [];
   Object.keys(messages).forEach((messageKey)=> {
     objMessage.push(this.parseMessage(messages[messageKey]));
   })
  return objMessage;
  }

  parseMessage(data) {
    return {
      key: data.key,
      text: data.title || data.message,
      author: data.samurai !== undefined ? 'bot' : 'user',
      timestamp: data.timestamp,
      type: data.type,
    };
  }

  /** Support for basic messages */
  messagesFilter(data) {
    return ['text', 'dialog'].includes(data.type);
  }

  scrollBottom(container) {
    container.scrollTop = container.scrollHeight;
  }

}
