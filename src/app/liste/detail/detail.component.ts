import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'src/app/model/article.model';
import { ITag } from 'src/app/model/tags.model';
import { BddService } from 'src/app/service/bdd.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  article!: IArticle
  tags: ITag[] = []
  constructor(private route: ActivatedRoute, private router: Router, private bddService: BddService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      const idN = parseInt(_id as string, 10);
      if(idN){
        this.singleArticle(idN);
      }
    });    
  }
  singleArticle(id: number) {
    this.bddService.getSingleArticle(id).subscribe((data: IArticle) => {
      this.article = data;
    });
    this.bddService.getTagsArticle(id).subscribe((datas:ITag[]) => {
      for(let info of datas){
        this.tags.push(info);
      }
    })  
  }
}
