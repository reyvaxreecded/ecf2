import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '../model/article.model';
import { ICategorie } from '../model/categorie.model';
import { ITag } from '../model/tags.model';
import { BddService, IArticleFilterOrder } from '../service/bdd.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  articles: IArticle[] = [];
  tags: ITag[]= [];
  articleTags: ITag[] = []
  categories: ICategorie[] = [];
  filter: IArticleFilterOrder = {
    type: "",
    value: ""
  };

  constructor(private route: ActivatedRoute, private bddService: BddService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('theme') != null && params.get('valeur') != null) {
        const _type = params.get('type') as string;
        const _value = params.get('value') as string;
        this.updateFilter(_type, _value);
      }
      else {
        this.bddService.getAllArticle().subscribe((datas: IArticle[]) => {
          for(let data of datas){
            let id = data.id_article
            this.bddService.getTagsArticle(id).subscribe((tags:ITag[]) => {
              let tagarticle: string[] = [];
              for (let tag of tags){                
                tagarticle.push(tag.nom_tag)                
              }
                this.articles.push({
                  id_article: data.id_article,
                  contenu_article: data.contenu_article,
                  date_creation_article: data.date_creation_article,
                  date_publication_article: data.date_publication_article,
                  titre_article: data.titre_article,
                  statut_article: data.statut_article,
                  nom_categorie: data.nom_categorie,
                  nom_tag: tagarticle
                })              
            }) 
          }
        })
        this.bddService.getAllTags().subscribe((datas: ITag[])=>{
          this.tags = datas
        })
        this.bddService.getAllCategorie().subscribe((datas: ICategorie[])=>{
          this.categories = datas
        })
      }
    });
  }
  updateFilter(type: string, value: string) {
    this.filter.type = type;
    this.filter.value = value;
    this.bddService.getFilterArticle(this.filter).subscribe((data: IArticle[]) => {
      this.articles = data;
    })
  }

  onFilterChanged(type:string, value:string) {
    const _type = type;
    const _value = value;
    this.bddService.getFilterArticle(this.filter).subscribe((data: IArticle[]) => {
      this.router.navigate(['/liste', { type: _type, value: _value }]);
      this.articles = data;
    })
  }
  onViewArticle(id: number) {
    this.router.navigate(['/liste', 'detail', id]);
  }
}
