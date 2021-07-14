using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatServer.Models
{
    public class Room
    {
        public string roomName { get; set; }
        public List<ChatMessage> messageList { get; set; }
        public List<string> userList { get; set; }
    }
}
