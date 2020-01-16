import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from './services/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngContentful';
  loading = true;
  
  private topBanners: Entry<any>;
  private placeholders : Entry<any>[]=[];
  constructor(private contentful : ContentfulService){    
  }



  ngOnInit() {
    console.log('topbaners 123' , this.topBanners);
  this.contentful.getTopBanner()
  .then(topBanners => {
    console.log('in top banner',this.topBanners);
    this.topBanners = topBanners;
    this.loading = false;
  });

  console.log('placeholders'+this.placeholders);
  this.contentful.getPlaceholder()
  .then(placeholders => this.placeholders = placeholders)
  }
  
}
