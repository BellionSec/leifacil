import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const testimonials = [
  {
    name: "Dr. Carlos Mendes",
    role: "Advogado Tributarista",
    content:
      "A LeiFácil revolucionou minha prática jurídica. Consigo encontrar precedentes e legislação em segundos, o que antes levava horas.",
    avatar: "CM",
  },
  {
    name: "Juliana Santos",
    role: "Estudante de Direito",
    content:
      "Como estudante, a LeiFácil tem sido fundamental para meus estudos. A clareza nas explicações e a rapidez nas respostas são impressionantes.",
    avatar: "JS",
  },
  {
    name: "Roberto Almeida",
    role: "Empresário",
    content:
      "Finalmente posso entender questões jurídicas sem precisar agendar consultas caras. A LeiFácil me ajuda a tomar decisões mais informadas para meu negócio.",
    avatar: "RA",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">O que nossos usuários dizem</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Veja como a LeiFácil está transformando a relação das pessoas com o direito
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
