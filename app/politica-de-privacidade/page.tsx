import { Navbar } from "@/components/navbar"

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Navbar />
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

          <div className="prose prose-blue max-w-none">
            <p>Última atualização: 10 de Maio de 2023</p>

            <h2>1. Introdução</h2>
            <p>
              A LeiFácil está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como
              coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nosso serviço.
            </p>

            <h2>2. Informações que Coletamos</h2>
            <p>Podemos coletar vários tipos de informações, incluindo:</p>
            <ul>
              <li>Informações pessoais como nome, endereço de e-mail e informações de pagamento</li>
              <li>Informações de uso, como consultas realizadas e interações com o serviço</li>
              <li>Informações do dispositivo, como endereço IP, tipo de navegador e sistema operacional</li>
            </ul>

            <h2>3. Como Usamos Suas Informações</h2>
            <p>Usamos as informações coletadas para:</p>
            <ul>
              <li>Fornecer, manter e melhorar nosso serviço</li>
              <li>Processar transações e enviar notificações relacionadas</li>
              <li>Personalizar sua experiência e fornecer conteúdo relevante</li>
              <li>Analisar como nosso serviço é usado para melhorar a funcionalidade</li>
            </ul>

            <h2>4. Compartilhamento de Informações</h2>
            <p>
              Não vendemos ou alugamos suas informações pessoais a terceiros. Podemos compartilhar suas informações com:
            </p>
            <ul>
              <li>Prestadores de serviços que nos ajudam a operar nosso serviço</li>
              <li>Autoridades legais quando exigido por lei</li>
            </ul>

            <h2>5. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração,
              divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet ou método de
              armazenamento eletrônico é 100% seguro.
            </p>

            <h2>6. Seus Direitos</h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direitos sobre seus dados pessoais,
              incluindo o direito de acessar, corrigir, excluir e portar seus dados.
            </p>

            <h2>7. Alterações nesta Política</h2>
            <p>
              Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações
              publicando a nova Política de Privacidade nesta página.
            </p>

            <h2>8. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco pelo e-mail:
              privacidade@leifacil.com.br
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
