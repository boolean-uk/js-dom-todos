async function getTodo() {
    const response = await fetch('https://boolean-api-server.fly.dev/MyrtheDullaart/todo')
    const data = await response.json()

    console.log(data)
}

getTodo()