import { Component, ComponentRef, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CardData } from './models/card-data';
import { FoodCardComponent } from "./components/food-card/food-card.component";
import { NgFor } from '@angular/common';
import { MenuItemDetailComponent } from './components/menu-item-detail/menu-item-details.component';
import { ItemDetailsHandlerService } from '@root/common/services/item-details-handler.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, FoodCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  protected menuItems: CardData[];
  private currentMenuItemViewed: MenuItemDetailComponent | undefined;

  constructor(private _elementRef: ElementRef, private _itemDetailsHandler: ItemDetailsHandlerService){
    this.menuItems = [
      new CardData(298, "עוגת שוקולד עשירה", "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "chocolate-cake.png"),
      new CardData(298, "עוגת שוקולד עשירה", "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "white-cake.png"),
      new CardData(298, "עוגת שוקולד עשירה", "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "sponge-cake.png")
    ];
  }

  handleViewItem(cardId: number){
    const selectedCard = this.menuItems.find(cardData => cardData.cardId == cardId) as CardData;
    this._itemDetailsHandler.openItemDetails(selectedCard);
  }

  getMenuItemDetails(){
    return this.currentMenuItemViewed;
  }

  get ElementRef(){
    return this._elementRef;
  }
}
