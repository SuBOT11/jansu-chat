const list = document.querySelector('ul');
const form = document.querySelector('.new-chat')
const changeName = document.querySelector('.new-name')
const mssg = document.querySelector('.update-mssg')
const changeRoom = document.querySelector('.chat-rooms')

changeName.addEventListener('submit',e=>{
  e.preventDefault();
  const newName = changeName.name.value.trim();
  chatroom.updateName(newName)
  changeName.reset();
  console.log('name updated')

  mssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => {
    mssg.innerText = ''
    
  }, 2000);
})

form.addEventListener('submit', e=>{
  e.preventDefault()
  const messages = form.text.value.trim()
  chatroom.addChat(messages).then(()=>{
    form.reset()
  }).catch(err=>{
    console.log(err)
  })
})

changeRoom.addEventListener('click',e=>{
  e.preventDefault()
  if(e.target.tagName === 'BUTTON'){
    lists.clear()
    
  }
  chatroom.updateRoom(e.target.getAttribute('id'))
  chatroom.getChats((data)=>{lists.render(data)})
  
})

const username = localStorage.username ? localStorage.username : 'anonymous'


const chatroom = new Chatroom(username ,'gaming');


chatroom.getChats(data=>{
 lists.render(data)

})
