import Image from "next/image";
import SignInForm from "@/components/SignInForm";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
interface SignInPageProps {
  searchParams: Promise<{ guest?: string; redirect_url?: string }>;
}

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { userId } = await auth();
  const redirectPath = userId ? "/jobs" : "/";
  const { guest, redirect_url } = await searchParams;
  const isGuest = guest === "true";

  return (
    <main>
      <header className="max-w-7xl mx-auto px-4 sm:px-8 py-2">
        <Link href={redirectPath}>
          <Image
            src="/logo-career-flow.svg"
            alt="career flow logo"
            className="h-28 w-auto"
            width={90}
            height={40}
            priority
          />
        </Link>
      </header>
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-0 min-h-[calc(100vh-64px)] grid lg:grid-cols-2 items-center gap-8">
        <Image
          src="/main.svg"
          alt="landing illustration"
          className="hidden lg:block"
          width={400}
          height={400}
        />
        <div className="w-full max-w-lg ml-auto">
          <SignInForm isGuest={isGuest} redirectUrl={redirect_url} />
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
