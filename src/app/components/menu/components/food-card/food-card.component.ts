import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardData as CardData } from '../../models/card-data';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [],
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.scss'
})
export class FoodCardComponent {
  @Input({ required: true }) cardData!: CardData;
  // Emits the if of the card data
  @Output() public viewItemEvent = new EventEmitter<number>();

  handleViewItem(){
    this.viewItemEvent.emit(this.cardData.cardId);
  }
}
