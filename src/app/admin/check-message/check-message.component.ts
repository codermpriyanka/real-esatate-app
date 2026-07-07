import { Component, OnInit } from '@angular/core';
import { CheckMessageServiceService } from './check-message-service.service';

@Component({
  selector: 'app-check-message',
  templateUrl: './check-message.component.html',
  styleUrls: ['./check-message.component.css']
})
export class CheckMessageComponent implements OnInit {

  constructor(private checkMessageService:CheckMessageServiceService) { }
messageBox:any
  ngOnInit() {
    this.getDetailMessage()
  }
getDetailMessage(){
  this.checkMessageService.getMessages().subscribe((res:any)=>{
    console.log(res)
    this.messageBox=res.data
  })
}
}
