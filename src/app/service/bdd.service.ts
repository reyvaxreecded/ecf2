import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IArticle } from '../model/article.model';
import { ITag } from '../model/tags.model';
import { ICategorie } from '../model/categorie.model';
import { INew } from '../model/new.model';

export interface IArticleFilterOrder {
  type: string,
  value: string
}

@Injectable({
  providedIn: 'root'
})
export class BddService {
  BASE_URL = "http://tp-ecf2"

  constructor(private httpClient: HttpClient) { }

  getAllArticle(): Observable<IArticle[]> {
    return this.httpClient.get<IArticle[]>(`${this.BASE_URL}/bdd.php`);
  }

  getSingleArticle(id: number): Observable<IArticle> {
    return this.httpClient.get<IArticle>(`${this.BASE_URL}/singleArticle.php/?id=${id}`);
  } 
  getTagsArticle(id: number): Observable<ITag[]>{
    return this.httpClient.get<ITag[]>(`${this.BASE_URL}/getTagsArticle.php/?id=${id}`);
  }

  getFilterArticle(filterInfo: IArticleFilterOrder): Observable<IArticle[]> {
    const typeCol = filterInfo.type || "categorie";
    const value = filterInfo.value || "cupcake";
    return this.httpClient.get<IArticle[]>(`${this.BASE_URL}/filter.php/?type=${typeCol}&value=${value}`);   
  }

  getAllTags(): Observable<ITag[]> {
    return this.httpClient.get<ITag[]>(`${this.BASE_URL}/getAllTags.php`);
  }
  getAllCategorie(): Observable<ICategorie[]> {
    return this.httpClient.get<ICategorie[]>(`${this.BASE_URL}/getAllCategories.php`);
  }

  createArticle(article: INew){
    let newArticle = JSON.stringify(article);
    this.httpClient.post(`${this.BASE_URL}/create.php`, newArticle).subscribe(
      (response) => {
        if(response){
          alert('article créer')
        }
        else {
          alert('error')
        }
      },
      (error) => console.log(error)
    );
  }
}
