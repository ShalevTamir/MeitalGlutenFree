import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [],
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.scss'
})
export class FoodCardComponent {
  static cardCount = 0;
  @Input({required: true}) imgName!: string;
  @Input({required: true}) description!: string;
  @Input({required: true}) price!: number;
  protected cardNumber: number;

  constructor(){
    FoodCardComponent.cardCount += 1;
    this.cardNumber = FoodCardComponent.cardCount;
  }
}
