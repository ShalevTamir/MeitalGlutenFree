import { AfterViewInit, Component, ComponentRef, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CardData } from './models/card-data';
import { FoodCardComponent } from "./components/food-card/food-card.component";
import { NgFor } from '@angular/common';
import { MenuItemDetailComponent } from './components/menu-item-detail/menu-item-details.component';
import { ItemDetailsHandlerService } from '@root/common/services/item-details-handler.service';
import { RefHtmlElement } from '@root/common/interfaces/RefHtmlElement.interface';
import { ScrollHandler } from '@root/common/services/scroll-handler.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, FoodCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements RefHtmlElement, AfterViewInit{
  @ViewChild('wrapper') private _wrapper!: ElementRef<HTMLElement>;
  public htmlRef: HTMLElement;
  protected menuItems: CardData[];
  private currentMenuItemViewed: MenuItemDetailComponent | undefined;

  constructor(private _elementRef: ElementRef, private _itemDetailsHandler: ItemDetailsHandlerService, private _scrollHandler: ScrollHandler){
    this.menuItems = [
      new CardData(298, "עוגת שוקולד עשירה", "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "chocolate-cake.png"),
      new CardData(298, "עוגת שוקולד עשירה", "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "white-cake.png"),
      new CardData(298, "עוגת שוקולד עשירה", "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "sponge-cake.png")
    ];
    this.htmlRef = _elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this._scrollHandler.SetMenuElementRef(this, this._wrapper.nativeElement);
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
