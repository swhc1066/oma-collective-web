import { PostcardHero } from "@/components/hero/PostcardHero";
import { TicketsCTA } from "@/components/hero/TicketsCTA";
import { SaveTheDate } from "@/components/sections/SaveTheDate";
import { Schedule } from "@/components/sections/Schedule";
import { Venue } from "@/components/sections/Venue";
import { AboutWordmark } from "@/components/sections/AboutWordmark";
import { SupportingOMA } from "@/components/sections/SupportingOMA";

export default function Page() {
  return (
    <main>
      <TicketsCTA />
      <PostcardHero />
      <SaveTheDate />
      <Schedule />
      <Venue />
      <AboutWordmark />
      <SupportingOMA />
    </main>
  );
}
