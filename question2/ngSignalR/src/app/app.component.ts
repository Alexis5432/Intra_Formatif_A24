import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor() {
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();


    this.isConnected = true;
    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
    this.hubConnection!.on('UpdateNbUsers', (data) => {
      this.nbUsers = data;

    });

    this.hubConnection!.on('UpdatePizzaPrice', (data) => {
      this.pizzaPrice = data;
    });
    
   this.hubConnection!.on('UpdateNbPizzasAndMoney', (NbPizzas:number, Money:number) => {
    this.nbPizzas = NbPizzas;
    this.money = Money;
   
});

this.hubConnection!.on('SelectChoice', (data) => {
      this.selectedChoice = data;
    });

    this.hubConnection!.on('UpdateMoney',(data)=> {
      this.money = data;
    })


    this.hubConnection
        .start()
        .then(() => {
            console.log('La connexion est active!');
          })
        .catch(err => console.log('Error while starting connection: ' + err));



  }

  selectChoice(selectedChoice: number) {
    this.selectedChoice = selectedChoice;
    this.hubConnection!.invoke('SelectChoice', selectedChoice);
  }

  unselectChoice() {
    this.selectedChoice = -1;
  }

  addMoney() {
  
      this.hubConnection!.invoke('AddMoney', this.selectedChoice);
    
  }

  buyPizza() {
    this.hubConnection!.invoke('BuyPizza', this.selectedChoice);
  }
}
