window.onload = () => {

  /* WS */
  // Definindo o callback, que - caso não haja erro - popula os parágrafos
  cb = res => {
    if (('erro' in res)) return
    document.querySelector('#uf').innerText = res.uf
    document.querySelector('#localidade').innerText = res.localidade
    document.querySelector('#bairro').innerText = res.bairro
    document.querySelector('#logradouro').innerText = res.logradouro
  }

  // Adicionando o script que consome o viaCEP e define o callback (`cb`)
  consumeViaWS = cep => {
    const scriptCep = document.createElement('script')
    scriptCep.src = `https://viacep.com.br/ws/${cep}/json/?callback=cb`
    document.querySelector('head').appendChild(scriptCep)
  }

  // Atrelando o disparo de `consumeViaWS` ao clique no botão #ws
  document.querySelector('#ws').onclick = e => {
    e.preventDefault()
    consumeViaWS(document.querySelector('#cep').value)
  }
  /* /WS */


  /* AJAX */
  // Definindo uma request
  const makeRequest = () => {
    let request
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      try {
        request = new ActiveXObject('Msxml2.XMLHTTP')
      } catch (e) {
        try {
          request = new ActiveXObject('Microsoft.XMLHTTP')
        } catch (e) {
          console.error(e)
          return
        }
      }
    }
    return request;
  }

  // Definindo um novo callback (`cb2`)
  const cb2 = res => {
    document.querySelector('#uf').innerText = res.uf
    document.querySelector('#localidade').innerText = res.localidade
    document.querySelector('#bairro').innerText = res.bairro
    document.querySelector('#logradouro').innerText = res.logradouro
  }

  // Definindo a execução da request
  const consumeViaAJAX = cep => {

    // Atribuindo a request à variável `xhr`
    xhr = makeRequest()

    // Definindo o que ocorre quando a request estiver concluída (state 4 - DONE e statusCode 200 - OK)
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(this.responseText)
        cb2(res)
      }
    }

    // Abrindo a request e passando os parâmetros (método, URL e se é assíncrono)
    xhr.open('GET', `https://viacep.com.br/ws/${cep}/json`, true)

    // Enviando a request
    xhr.send()
  }

  // Atrelando o disparo de `consumeViaWS` ao clique no botão #ws
  document.querySelector('#ajax').onclick = e => {
    e.preventDefault()
    consumeViaAJAX(document.querySelector('#cep').value)
  }
  /* /AJAX */
}