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
        List<Room> rooms = new List<Room> {
        new Room { roomName = "General" },
        new Room { roomName = "Random" },
        new Room { roomName = "Sports" }
        };
        
        public async Task JoinRoom(string username,string roomName)
        {
            await Groups.AddToGroupAsync(username, roomName);
            var room = rooms.Find((x) => x.roomName == roomName);
            room.userList.Add(username);
            await Clients.Caller.SendAsync("JoinRoom", room.messageList,room.userList);
            await Clients.OthersInGroup(roomName).SendAsync("RecieveMessage", "User " + username + " joined the room!");
        }
        public async Task LeaveRoom(string username, string roomName)
        {
            var room = rooms.Find((x) => x.roomName == roomName);
            room.userList.Remove(username);
            await Groups.RemoveFromGroupAsync(username, roomName);
        }
        public async Task SendMessage(string message,string roomName,string username)
        {
            var room = rooms.Find((x) => x.roomName == roomName);
            room.messageList.Add(new ChatMessage { username = username, message = message });
            await Clients.Group(roomName).SendAsync("RecieveMessage", username,message);
        }
    }
}
