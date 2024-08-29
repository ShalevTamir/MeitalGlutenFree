import { Component, ElementRef } from '@angular/core';
import { CardData } from './models/card-data';
import { FoodCardComponent } from "./components/food-card/food-card.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, FoodCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  protected menuItems: CardData[];

  constructor(private _elementRef: ElementRef){
    this.menuItems = [
      new CardData(298, "עוגת שוקולד עשירה", "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "chocolate-cake.png"),
      new CardData(298, "עוגת שוקולד עשירה", "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "white-cake.png"),
      new CardData(298, "עוגת שוקולד עשירה", "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "sponge-cake.png")
    ];
  }

  handleViewItem(cardId: number){
    console.log(cardId);
  }

  get ElementRef(){
    return this._elementRef;
  }
}
