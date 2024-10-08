import Link from "next/link";
import Image from "next/image";
import unlock from '@/assets/unlock.webp';

export default function Home() {
  return (
    <main className="w-screen py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex lg:flex-row flex-col gap-4 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
              Unlock the Power of the Web
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Discover our suite of tools and services to build, deploy, and scale your web applications with ease.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {/* Link to Sign In */}
              <Link href="/signin">
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Sign In
                </button>
              </Link>

              {/* Link to About */}
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
          </div>
          <Image
            alt="Hero"
            loading="lazy"
            width={1200}
            height={1200}
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover w-full max-w-[550px]"
            src={unlock}
          />
        </div>
      </div>
    </main>
  );
}
