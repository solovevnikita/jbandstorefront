import { Component, OnInit } from '@angular/core';

import { ContentService } from 'src/app/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  content: any;
  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
  ) { }
  async ngOnInit() {
    this.content = await this.contentService.getContent(this.route.routeConfig.path);
  }
}
