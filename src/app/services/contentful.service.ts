import { Injectable } from "@angular/core";
import { createClient, ContentfulClientApi, Entry } from "contentful";

const CONFIG = {
  space: "0n6cultcgei4",
  accessToken: "xwsO_lN1R7pFKdMyNWgtitVBx5LKhhPA_U3ERS9p-Uo",

  contentTypeIds: {
    topBanner: "topBanner",
    placeholdersLogin: "placeholdersLogin"
  }
};

@Injectable({
  providedIn: "root"
})
export class ContentfulService {
  private client: ContentfulClientApi;
  constructor() {
    console.log("this service is loaded");
    this.client = createClient({
      space: CONFIG.space,
      accessToken: CONFIG.accessToken
    });
  }


  getTopBanner(query?: object): Promise<Entry<any>> {
    return this.client
      .getEntries(
        Object.assign(
          {
            content_type: CONFIG.contentTypeIds.topBanner
          },
          query
        )
      )
      .then(res => {
        console.log(res.items);
        var items =res.items;
        items.sort(function compare(a, b) {
          var dateA : any= new Date(a.sys.updatedAt);
          var dateB : any = new Date(b.sys.updatedAt);
          return dateB - dateA;
        });
        console.log('items',items);
        return res.items[0];
      });
  }

  getPlaceholder(query?: object): Promise<Entry<any>[]> {
    return this.client
      .getEntries(
        Object.assign(
          {
            content_type: CONFIG.contentTypeIds.placeholdersLogin
          },
          query
        )
      )
      .then(res => res.items);
  }
}
