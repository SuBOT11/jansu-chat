class Chatroom {
  constructor(username,room){
    this.username = username,
    this.room = room,
    this.chats = db.collection('chats')
    this.unsub;
  }
  async addChat(message){
    const now = new Date();
    const chat = {
      username : this.username,
      room : this.room,
      message : message,
      created_at : firebase.firestore.Timestamp.fromDate(now),
     
    };
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback){
    
    this.unsub = this.chats
    .where('room','==',this.room)
    .orderBy('created_at')
    .onSnapshot(snapshot=>{
      snapshot.docChanges().forEach(change=>{
        if(change.type === 'added'){
          callback(change.doc.data());
        }
      })
    })
  }
  updateName(username){
    this.username = username;
    localStorage.setItem("username" , username )
  }
  updateRoom(room){
    this.room = room;
    console.log(`room updated to ${this.room} `)
    if(this.unsub){
      this.unsub();
    }
  }
}






