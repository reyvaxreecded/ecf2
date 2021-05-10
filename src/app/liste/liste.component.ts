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
          let i: number = 0;
          for (let data of datas) {            
            if (i < 1) {
              this.articles[i] = data;
            }
            else{
              if(data.id_article == this.articles[i-1].id_article){
                this.articles[i-1].nom_tag = this.articles[i-1].nom_tag +","+ data.nom_tag;
              }
              else{
                this.articles[i] = data;
              }
            }
            i++;
          }
          console.log(this.articles)
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
