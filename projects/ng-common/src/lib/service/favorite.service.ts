import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {FavoriteTypes, MyFavorite} from "../interface/favorite.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private restService: RestService
  ) { }

  public getPersonalFavorites(): Observable<MyFavorite[]> {
    return this.restService.GET('https://commerce-api.gollala.org/favorite/auth/', {
      handleError: true
    });
  }

  public getPersonalFavorite(id: string): Observable<MyFavorite> {
    return this.restService.GET(`https://commerce-api.gollala.org/favorite/auth/${id}`, {
      handleError: true
    });
  }

  public addPersonalFavorites(body: {type: FavoriteTypes; targetId: string}): Observable<MyFavorite> {
    return this.restService.POST('https://commerce-api.gollala.org/favorite/auth', {
      body,
      handleError: true
    });
  }

  public subtractFavorite(id: string): Observable<MyFavorite> {
    return this.restService.DELETE(`https://commerce-api.gollala.org/favorite/auth/${id}`);
  }
}
