"use client"

import { Home } from "lucide-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { quotesData } from "@/data/quotes"

export default function QuotesPage() {
    const router = useRouter()
    const { topic } = router.query

    const [quotes, setQuotes] = useState<string[]>([])
    const [flipped, setFlipped] = useState(false)

    useEffect(() => {
        if (typeof topic === "string") {
                const matched = quotesData
                .filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
                .map((q) => q.text)

                const randomQuotes = getRandomQuotes(matched, 3)

                setQuotes(
                    randomQuotes.length
                        ? randomQuotes
                        : ["No quotes found.", "Try another topic.", "Inspira awaits."]
                )

                setFlipped(false)
                setTimeout(() => setFlipped(true), 500)
        }
    }, [topic])

    function getRandomQuotes(array: string[], count: number) {
        return [...array].sort(() => Math.random() - 0.5).slice(0, count)
    }


    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white relative">

            {/* Home Icon */}
            <button
                onClick={() => router.push("/")}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Go Home"
            >
                <Home className="w-6 h-6 text-rose-600" />
            </button>

            {typeof topic === "string" && (
            <h2 className="text-2xl md:text-2xl font-semi-bold text-rose-700 mb-5 mt-1 capitalize">
                {topic}
            </h2>
            )}

            {/* Quote Cards */}
            <motion.div
                className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
            {quotes.map((quote, index) => (
                <motion.div
                key={index}
                className="card-flip w-[240px] md:w-[280px] h-[400px] md:h-[460px] shrink-0"
                >
                <div className={`card-inner ${flipped ? "card-flipped" : ""}`}>
                    <div className="card-front" />
                    <div className="card-back flex items-center justify-center text-center p-4">
                    <p className="text-rose-700 font-medium italic text-lg md:text-xl leading-relaxed text-center px-4 drop-shadow-sm">
                        “{quote}”
                    </p>
                    </div>
                </div>
                </motion.div>

                ))}
            </motion.div>

        </main>
    )
    }
