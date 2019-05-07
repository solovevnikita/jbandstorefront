import { Component } from '@angular/core';

import { ContentService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private contentService: ContentService,
    private userService: UserService
  ) { }
  goTo(event) {
    this.contentService.goToPage(event.target.innerHTML);
  }
  openSignIn() {
    this.userService.getUserInfo();
  }
}
