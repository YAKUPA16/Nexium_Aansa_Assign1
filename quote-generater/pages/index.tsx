import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  topic: z.string().min(1, "Please enter a topic"),
})

export default function Home() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "" },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/quotes?topic=${encodeURIComponent(data.topic)}`)
  }

  return (
    <>
      <Head>
        <title>Inspira | Quote Generator</title>
      </Head>

      <main className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden px-4">
        {/* Left cards */}
        <Image
          src="/left-cards.png"
          alt="Cards Left"
          width={500}
          height={700}
          className="absolute left-0 bottom-0 rotate-[0deg] z-0"
        />

        {/* Right cards */}
        <Image
          src="/right-cards.png"
          alt="Cards Right"
          width={500}
          height={700}
          className="absolute right-0 bottom-0 rotate-[0deg] z-0"
        />

        {/* Main Text */}
        <div className="text-center z-10 max-w-md w-full space-y-4">
          <h1 className="text-5xl font-serif font-semibold text-black">Inspira</h1>
          <p className="text-lg text-rose-600 tracking-wide">Quote Generator</p>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Enter a topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. success, failure"
                        {...field}
                        className="text-black bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-2 px-6 py-2 bg-black text-white tracking-widest shadow-md hover:shadow-lg w-full"
              >
                START
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  )
}
