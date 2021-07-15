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
       static List<Room> rooms = new List<Room> {
        new Room { roomName = "General" },
        new Room { roomName = "Random" },
        new Room { roomName = "Sports" }
        };
        
        public async Task ChangeRoom(string username,string joinedRoomName,string leftRoomName )
        {
            try
            {
                var room = rooms.Find((x) => x.roomName == joinedRoomName);
                if (!String.IsNullOrEmpty(leftRoomName))
                {
                    var leftRoom = rooms.Find((x) => x.roomName == leftRoomName);
                    leftRoom.userList.Remove(username);
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, leftRoomName);
                }
                    await Groups.AddToGroupAsync(Context.ConnectionId, joinedRoomName);
                    room.userList.Add(username);
                    await Clients.OthersInGroup(joinedRoomName).SendAsync("ReceiveMessage", "User " + username + " joined the room!", "Admin",username);
                    await Clients.Caller.SendAsync("JoinRoom", room.messageList, room.userList);
                
            }
            catch (Exception)
            {

                throw;
            }
                
        }
        public  Task LeaveRoom(string username, string roomName)
        {
            try
            {
                var room = rooms.Find((x) => x.roomName == roomName);
                room.userList.Remove(username);
                return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task SendMessage(string message,string roomName,string username)
        {
            try
            {
                var room = rooms.Find((x) => x.roomName == roomName);
                room.messageList.Add(new ChatMessage { username = username, message = message });
                await Clients.Group(roomName).SendAsync("ReceiveMessage", message, username);
            }
            catch (Exception)
            {

                throw;
            }
          
        }
    }
}
