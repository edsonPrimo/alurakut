import React from 'react';
// Hook do NextJS
import { useRouter } from 'next/router'
import nookies from 'nookies'

export default function LoginScreen() {
  const router = useRouter()
  const [githubUser, setGithubUser] = React.useState('')
  const [valida, setValida] = React.useState(false)

  const validando = async () => {
    await fetch(`https://api.github.com/users/${githubUser}`)
      .then((e) => {
        console.log(e)
        e.ok ? setValida(false) : setValida(true)
      })
  }
  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={(e) => {
            e.preventDefault()
            setValida(false)
            // validando()
            if (!valida) {
              fetch('https://alurakut.vercel.app/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ githubUser: githubUser })
              }).then(async (res) => {
                const data = await res.json()
                const token = data.token;
                nookies.set(null, 'USER_TOKEN', token, {
                  path: '/',
                  maxAge: 86400 * 7
                })
                router.push('/')
              })
            }
          }}  >

            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input placeholder="Usuário" value={githubUser} onChange={(e) => setGithubUser(e.target.value)}
            />
            {/* onBlur={validando} */}
            {valida ? 'Usuário não encontrado' : ''}
            <button>
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer>

          <button style={{ width: '200px' }} onClick={() => {
            fetch('https://api-dev.cryptum.io/front-sdk/auth', {
              method: 'POST',
              credentials: "include",
              headers: {
                'x-client-id': '7bec074e-d912-4844-9ad3-3613d57a5f9d'
              },
              credentials: 'include'
            })
              .then(response => {
                console.log("response", response)
                // Processar a resposta aqui
              })
              .catch(error => {
                console.log("error", error)
                // Lidar com erros aqui
              });
          }}>
            TESTAR A BAGAÇA
          </button>

        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}