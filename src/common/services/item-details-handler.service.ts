import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { MenuItemDetailComponent } from '@root/app/components/menu/components/menu-item-detail/menu-item-details.component';
import { CardData } from '@root/app/components/menu/models/card-data';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsHandlerService {
  private _viewContainerRef!: ViewContainerRef;
  private _itemDetailsComponent: MenuItemDetailComponent | undefined;
  
  constructor() { 
  }

  setViewContainerRef(containerRef: ViewContainerRef){
    this._viewContainerRef = containerRef;
  }

  private generateComponent(){
    const component: ComponentRef<MenuItemDetailComponent> = this._viewContainerRef.createComponent(MenuItemDetailComponent);
    this._itemDetailsComponent = component.instance;
  }

  openItemDetails(cardData: CardData){
    if (this._itemDetailsComponent === undefined){
      this.generateComponent();
    }
    this._itemDetailsComponent?.setCardData(cardData);
    this._itemDetailsComponent?.open();
  }
}
