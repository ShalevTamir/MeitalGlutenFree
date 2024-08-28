import { Component } from '@angular/core';
import { Card } from './models/card';
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
  protected menuItems: Card[];

  constructor(){
    this.menuItems = [
      new Card(298, "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "chocolate-cake.png"),
      new Card(298, "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "white-cake.png"),
      new Card(298, "עוגת שוקולד עשירה עם מרקם רך ונימוח. עשויה משוקולד איכותי ומושלמת לכל אירוע", "sponge-cake.png")
    ];
  }
}
