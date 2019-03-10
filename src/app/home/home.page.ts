import { Component ,OnInit} from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { HttpClient } from  "@angular/common/http";

const firstUserName="tseries";
const secondUserName="PewDiePie";
const apiKey="***********************************";

const firstUserStaticUrl="https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername="+firstUserName+"&key="+apiKey;
const secondUserStaticUrl="https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername="+secondUserName+"&key="+apiKey;

const firstUserDetailUrl="https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername="+firstUserName+"&key="+apiKey;
const secondUserDetailUrl="https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername="+secondUserName+"&key="+apiKey;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private  httpClient:HttpClient) {}
  firstCounter:number = 0;
  secondCounter:number = 0;
  firstDetails:any = {};
  secondDetails:any = {};
  winner:any = {};

  ngOnInit() {
    var f_details=this.httpClient.get<any>(firstUserDetailUrl).subscribe(res =>{
      this.firstDetails.img=res.items[0].snippet.thumbnails.default;
      this.firstDetails.title=res.items[0].snippet.title;
    });
    var s_details=this.httpClient.get<any>(secondUserDetailUrl).subscribe(res => {
      this.secondDetails.img=res.items[0].snippet.thumbnails.default;
      this.secondDetails.title=res.items[0].snippet.title;
    });
     this.startCounter();
}
startCounter() {
     setInterval(() => {

      var f_call=this.httpClient.get<any>(firstUserStaticUrl).subscribe(res =>{
        this.firstCounter=res.items[0].statistics.subscriberCount;
      });
      var s_call=this.httpClient.get<any>(secondUserStaticUrl).subscribe(res => {
        this.secondCounter=res.items[0].statistics.subscriberCount;
      });
      if (this.firstCounter > this.secondCounter ){
        this.winner.title=this.firstDetails.title;
        this.winner.diff=this.firstCounter-this.secondCounter;
      }
      else{
        this.winner.title=this.secondDetails.title;
        this.winner.diff=this.secondCounter-this.firstCounter;
      }


    }, 2000);
  }
}
