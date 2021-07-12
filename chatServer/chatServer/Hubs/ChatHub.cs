using chatServer.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatServer.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinRoom(string username,string roomNumber)
        {
            await Groups.AddToGroupAsync(username, roomNumber);
        }
        public async Task LeaveRoom(string username, string roomNumber)
        {
            await Groups.RemoveFromGroupAsync(username, roomNumber);
        }
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
