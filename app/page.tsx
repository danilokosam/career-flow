import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header with logo */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-2">
        <Image
          src="/logo-career-flow.svg"
          alt="CareerFlow logo"
          width={90}
          height={40}
          priority
          className="dark:invert shrink-0 h-28 w-auto"
          // style={{ border: "solid red 2px" }}
        />
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 grow grid lg:grid-cols-2 items-center gap-12 py-8 lg:py-0">
        {/* Left-hand column: Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-none">
            Career <span className="text-primary italic">Flow</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mt-4 text-muted-foreground uppercase tracking-wider">
            Elevate your professional journey
          </h2>

          <div className="mt-8 space-y-6">
            <p className="text-lg leading-relaxed max-w-xl text-muted-foreground text-pretty">
              <strong>CareerFlow</strong> is an intelligent ecosystem built to
              simplify the chaos of the job hunt. We provide a streamlined
              experience to <strong>organize, manage, and optimize</strong>{" "}
              every stage of your applications.
            </p>
            <p className="text-lg leading-relaxed max-w-xl text-muted-foreground text-pretty">
              Powered by a modern stack, our platform offers real-time analytics
              and a seamless interface to keep you focused on landing your next
              big opportunity.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-10">
            <Button
              asChild
              size="lg"
              className="px-10 h-12 font-bold text-md shadow-md hover:shadow-primary/20 transition-all"
            >
              <Link href="/add-job">Start Your Flow</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 h-12 font-bold text-md"
              asChild
            >
              <Link href="/jobs">View Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Right-hand column: Image (Hidden on Mobile, Visible on LG) */}
        <div className="hidden lg:flex relative justify-end items-center h-full">
          <Image
            src="/main.svg"
            alt="CareerFlow landing illustration"
            className="object-contain drop-shadow-xl"
            width={600}
            height={600}
            priority
          />
        </div>
      </section>
    </main>
  );
}
