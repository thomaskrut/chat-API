let getActiveUsersCallback = initGetActiveUsers('__anonymous__')


function join() {
    event.preventDefault()
    username = document.getElementById('sender').value
    clearInterval(getActiveUsersCallback)
    getActiveUsersCallback = initGetActiveUsers(username)
    
}

function send() {
    event.preventDefault()
    const sender = document.getElementById('sender').value
    const message = document.getElementById('message').value
    const receiver = "__everyone__"
    const data = {
        sender,
        receiver,
        message,
    }
    document.getElementById('message').value = ''
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://messserver-thomaskkrut.b4a.run/message')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data))
}

function initGetActiveUsers(username) {

    return setInterval(() => {
        const xhr2 = new XMLHttpRequest()
        xhr2.open('GET', 'https://messserver-thomaskkrut.b4a.run/activeusers/' + username)
        xhr2.send()
        xhr2.onload = () => {
            const activeusers = JSON.parse(xhr2.response)
            console.log(activeusers)
          
                const activeusersDiv = document.getElementById('activeusers')
                activeusersDiv.innerHTML = ''
                activeusers.forEach(activeuser => {
                    const activeuserDiv = document.createElement('div')
                    activeuserDiv.innerHTML = `

                        <p>${activeuser}</p>
                    `
                    activeusersDiv.appendChild(activeuserDiv)
                })
            
        }

    }, 3000)


}

function initGetMessages(username) {
    console.log(username)
    setInterval(() => {
        const xhr1 = new XMLHttpRequest()
        xhr1.open('GET', 'https://messserver-thomaskkrut.b4a.run/message/' + username)
        xhr1.send()

        xhr1.onload = () => {
            const messages = JSON.parse(xhr1.response)
            console.log(messages)
            if (messages.length > 0) {
                const messagesDiv = document.getElementById('messages')
                
                messages.forEach(message => {
                    const messageDiv = document.createElement('div')
                    messageDiv.innerHTML = `
                        <b>${message.sender}</b>> ${message.message}
                    `
                    messagesDiv.appendChild(messageDiv)
                })
            }
        }
    }, 3000)
}

