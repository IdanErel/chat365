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
        // internal memory of rooms with user list and chat history per room (instead of a database)
       static List<Room> rooms = new List<Room> {
        new Room { roomName = "General" },
        new Room { roomName = "Random" },
        new Room { roomName = "Sports" }
        };
        /// <summary>
        /// action that get triggered when a user changes room.
        /// removes user from the previous room and informing the other users that someone left
        /// adding the user to the new room and informing the other users in the new room that someone joined
        /// sends the chat history and new user list to the user that invoked the change.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="joinedRoomName"></param>
        /// <param name="leftRoomName"></param>
        /// <returns></returns>
        public async Task ChangeRoom(string username,string joinedRoomName,string leftRoomName )
        {
            try
            {
                var room = rooms.Find((x) => x.roomName == joinedRoomName);
                if (!String.IsNullOrEmpty(leftRoomName))
                {
                    var leftRoom = rooms.Find((x) => x.roomName == leftRoomName);
                    leftRoom.userList.RemoveAll((user)=>user.id==Context.ConnectionId&&user.name==username);
                    await Clients.OthersInGroup(leftRoomName).SendAsync("UserLeftRoom", username);
                    await Groups.RemoveFromGroupAsync(Context.ConnectionId, leftRoomName);

                }
                await Groups.AddToGroupAsync(Context.ConnectionId, joinedRoomName);
                    room.userList.Add(new User { id = Context.ConnectionId, name = username });
                    await Clients.OthersInGroup(joinedRoomName).SendAsync("ReceiveMessage", "User " + username + " joined the room!", "Admin");
                await Clients.OthersInGroup(joinedRoomName).SendAsync("UserJoinedRoom", username);
                await Clients.Caller.SendAsync("JoinRoom", room.messageList, room.userList);
                
            }
            catch (Exception)
            {

                throw;
            }
                
        }
        /// <summary>
        /// overriding the onDisconnect method to remove user from the room when refreshing or leaving the page
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                var room = rooms.Find((x) => x.userList.Exists((user) => user.id == Context.ConnectionId));
                if (room != null)
                    room.userList.RemoveAll(user => user.id == Context.ConnectionId);
                return base.OnDisconnectedAsync(exception);
            }
            catch (Exception)
            {

                throw;
            }

        }
        /// <summary>
        /// triggers when a user signs out from the site
        /// updates the room user list and informing the users that someone left.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="roomName"></param>
        /// <returns></returns>
        public  async Task LeaveRoom(string username, string roomName)
        {
            try
            {
                var room = rooms.Find((x) => x.roomName == roomName);
                room.userList.RemoveAll((user) => user.id == Context.ConnectionId && user.name == username);
                await Clients.OthersInGroup(roomName).SendAsync("UserLeftRoom", username);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);

            }
            catch (Exception)
            {
                throw;
            }
        }
        /// <summary>
        /// sends a message to all users in the chat room and updates internal message list of the room
        /// </summary>
        /// <param name="message"></param>
        /// <param name="roomName"></param>
        /// <param name="username"></param>
        /// <returns></returns>
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
