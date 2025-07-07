import { useState } from 'react'
import { quotesData } from '../data/quotes' // Adjust path
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  topic: z.string().min(1, "Please enter a topic"),
})

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "" },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const matched = quotesData
      .filter(q => q.topic.toLowerCase() === data.topic.toLowerCase())
      .map(q => q.text)
      .slice(0, 3)
    setQuotes(matched.length ? matched : ["No quotes found for that topic."])
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-pink-50 px-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Quote Generator</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
        >
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Enter a topic</FormLabel>
                <FormControl>
                    <Input
                        placeholder="e.g. success, failure, growth, discipline"
                        {...field}
                        className="text-black placeholder-gray-500"
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Generate Quotes
          </Button>
        </form>
      </Form>

      <div className="mt-8 space-y-4 w-full max-w-xl text-center">
        {quotes.map((quote, i) => (
          <p key={i} className="bg-white p-4 rounded shadow text-gray-700">
            {quote}
          </p>
        ))}
      </div>
    </main>
  )
}
