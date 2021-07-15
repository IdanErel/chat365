using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatServer.Models
{
    public class Room
    {
        public string roomName { get; set; }
        public List<ChatMessage> messageList { get; set; } = new List<ChatMessage>();
        public List<User> userList { get; set; } = new List<User>();
    }
}
