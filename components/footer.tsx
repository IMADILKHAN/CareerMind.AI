import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function FooterLanding() {
  return (
    <section className="w-full">
      <div className="mx-auto py-24 rounded-lg bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600">
        <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Ready to Accelerate Your Career?
          </h2>
          <p className="mx-auto max-w-[600px] text-white/80 md:text-xl">
            Unlock your full potential with AI-powered career guidance — designed to
            help you grow faster, work smarter, and achieve your goals with clarity.
          </p>
          <Link href="/dashboard" passHref>
            <Button
              size="lg"
              variant="secondary"
              className="h-11 mt-5 animate-bounce"
            >
              Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
