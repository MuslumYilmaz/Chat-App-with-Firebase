const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

//update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset form
    newNameForm.reset();
    //show - hid update messages
    updateMssg.innerText = `Your name has updated to ${newName}`;

    setTimeout(() =>  updateMssg.remove(), 3000)
});
//update the rooms
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

//check localstorage for a name
const username = localStorage.username ? localStorage.username : 'anon';

//class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general', username);
//get chats and render
chatroom.getChats(data => chatUI.render(data));

