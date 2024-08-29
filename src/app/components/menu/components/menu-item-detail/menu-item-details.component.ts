import { Component, Input } from '@angular/core';
import { localPhoneNumber } from '@root/app/models/contact-data';
import { CardData } from '../../models/card-data';

@Component({
  selector: 'app-menu-item-details',
  standalone: true,
  imports: [],
  templateUrl: './menu-item-details.component.html',
  styleUrl: './menu-item-details.component.scss'
})
export class MenuItemDetailComponent {
  @Input({ required: true }) cardData!: CardData
  protected readonly localPhoneNumber: string = localPhoneNumber;
}
