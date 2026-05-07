import { PostcardHero } from "@/components/hero/PostcardHero";
import { TicketsCTA } from "@/components/hero/TicketsCTA";
import { Intro } from "@/components/sections/Intro";
import { Schedule } from "@/components/sections/Schedule";
import { Venue } from "@/components/sections/Venue";
import { Impact } from "@/components/sections/Impact";
import { AboutOMA } from "@/components/sections/AboutOMA";
import { Tickets } from "@/components/sections/Tickets";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main>
      <TicketsCTA />
      <PostcardHero />
      <Intro />
      <Schedule />
      <Venue />
      <Impact />
      <AboutOMA />
      <Tickets />
      <Footer />
    </main>
  );
}
