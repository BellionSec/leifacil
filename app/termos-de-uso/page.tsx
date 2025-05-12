import { Navbar } from "@/components/navbar"

export default function TermosDeUsoPage() {
  return (
    <>
      <Navbar />
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>

          <div className="prose prose-blue max-w-none">
            <p>Última atualização: 10 de Maio de 2023</p>

            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou usar o serviço LeiFácil, você concorda em cumprir estes Termos de Uso e todas as leis e
              regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar
              este site.
            </p>

            <h2>2. Uso do Serviço</h2>
            <p>
              A LeiFácil fornece uma plataforma de inteligência artificial para consultas jurídicas. As informações
              fornecidas pela plataforma são de natureza geral e não constituem aconselhamento jurídico específico.
              Recomendamos sempre consultar um advogado para questões legais específicas.
            </p>

            <h2>3. Contas de Usuário</h2>
            <p>
              Quando você cria uma conta conosco, você deve fornecer informações precisas, completas e atualizadas. Você
              é responsável por manter a confidencialidade de sua conta e senha e por restringir o acesso ao seu
              computador, e concorda em aceitar a responsabilidade por todas as atividades que ocorram em sua conta.
            </p>

            <h2>4. Limitações de Responsabilidade</h2>
            <p>
              A LeiFácil não será responsável por quaisquer danos diretos, indiretos, incidentais, consequenciais ou
              punitivos resultantes do uso ou incapacidade de usar o serviço, mesmo que tenhamos sido informados da
              possibilidade de tais danos.
            </p>

            <h2>5. Propriedade Intelectual</h2>
            <p>
              O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva da
              LeiFácil e seus licenciadores. O serviço é protegido por direitos autorais, marcas registradas e outras
              leis.
            </p>

            <h2>6. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar ou substituir estes termos a qualquer momento. É sua responsabilidade
              verificar periodicamente os termos para alterações. O uso continuado do serviço após a publicação de
              quaisquer alterações constitui aceitação dessas alterações.
            </p>

            <h2>7. Lei Aplicável</h2>
            <p>
              Estes termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas
              disposições de conflito de leis.
            </p>

            <h2>8. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail:
              contato@leifacil.com.br
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
