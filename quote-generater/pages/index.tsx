import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Inspira | Quote Generator</title>
      </Head>

      <main className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">

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
        <div className="text-center z-10">
          <h1 className="text-5xl font-serif font-semibold text-black">Inspira</h1>
          <p className="text-lg text-rose-600 mt-2 tracking-wide">Quote Generator</p>

          {/* Start Button */}
          <Link href="/quotes">
            <button className="mt-6 px-6 py-2 bg-black text-white tracking-widest shadow-md hover:shadow-lg transition-all">
              START
            </button>
          </Link>
        </div>
      </main>
    </>
  )
}
