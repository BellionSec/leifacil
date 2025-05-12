import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
  buttonVariant?: "default" | "outline"
}

interface PricingCardProps {
  plan: PricingPlan
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <Card className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
      {plan.popular && (
        <div className="rounded-t-lg bg-primary py-1 text-center text-xs font-medium text-primary-foreground">
          Mais Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">R${plan.price}</span>
          <span className="text-sm text-muted-foreground">/mês</span>
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={plan.buttonVariant || "default"}>
          {plan.buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
