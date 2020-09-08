import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http"
import {YoutubeResponse} from "../models/youtube.models"
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = "https://www.googleapis.com/youtube/v3"
  private apiKey = "AIzaSyDp6aWUA24O7MCWb2IpAdQ1uFbxPm-Coas"
  private playlist = "UUuaPTYj15JSkETGnEseaFFg"
  private nextPageToken = "CAoQAA"
  constructor(private http: HttpClient) {}
  getYoutube(){
    const url = `${this.youtubeUrl}/playlistItems`
    const params = new HttpParams()
      .set("part", "snippet")
      .set("maxResults", "10")
      .set("playlistId", this.playlist)
      .set("key", this.apiKey)
      .set("pageToken", this.nextPageToken)
   return this.http.get<YoutubeResponse>(url, {params})
     .pipe(
       map(resp=>{
         this.nextPageToken = resp.nextPageToken
         return resp.items
       }),
       map(items=>{
        return items.map(video => video.snippet)
       })
      )
  }
}
