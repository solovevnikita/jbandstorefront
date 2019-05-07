import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {

  constructor(private modalService: NgbModal) {}

  openSubscribeModal(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }
}
