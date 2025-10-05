using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            _pizzaManager.AddUser();

            await Clients.All.SendAsync("NbUser", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _pizzaManager.RemoveUser();
            await Clients.All.SendAsync("NbUser", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            string groupName = _pizzaManager.GetGroupName(choice);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.All.SendAsync("PizzaPrice", _pizzaManager.PIZZA_PRICES[(int)choice]);

            await Clients.All.SendAsync("NombrePizza", _pizzaManager.NbPizzas[(int)choice], _pizzaManager.Money[(int)choice]);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            string groupName = _pizzaManager.GetGroupName(choice);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

        }

        public async Task AddMoney(PizzaChoice choice)
        {
            string groupName = _pizzaManager.GetGroupName(choice);
            _pizzaManager.IncreaseMoney(choice);

            await Clients.Group(groupName).SendAsync("AddArgent", _pizzaManager.Money[(int)choice]);

        }

        public async Task BuyPizza(PizzaChoice choice)
        {
             string groupName = _pizzaManager.GetGroupName(choice);
            _pizzaManager.BuyPizza(choice);
            await Clients.Group(groupName).SendAsync("NombresPizza", _pizzaManager.NbPizzas[(int)choice], _pizzaManager.Money[(int)choice]);

        }
    }
}
