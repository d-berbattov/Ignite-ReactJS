import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { Link, useNavigate } from "react-router-dom"
const signInForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),

})

type SignUpForm = z.infer<typeof signInForm>

export function SignUp() {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

  async function handleSignIn(data: SignUpForm) {
    try {

      console.log(data)

      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate('/sign-in')
        }
      })

    } catch {
      toast.error("Erro ao cadastrar restaurante.")

    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        
        <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/sign-in" >
          Novo estabelecimento
        </Link>
        </Button>
        <div className="w[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">Criar conta gratís</h1>
            <p className="text-sm text-muted-foreground">Seja um parceriro e comece suas vendas agora!</p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Nome do estabelecimento</Label>
              <Input id="restaurantName" type="text" {...register('restaurantName')}></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu nome</Label>
              <Input id="managerName" type="text" {...register('managerName')}></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')}></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu telefone</Label>
              <Input id="phone" type="tel" {...register('phone')}></Input>
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit" >
              Finalizars cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">Ao continuar, você concorda com nossos termos
            de serviços e <a className="underline underline-offset-4" href="">políticas de privacidade</a>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}