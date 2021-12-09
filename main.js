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
}