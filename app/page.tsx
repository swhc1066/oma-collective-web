import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { OmaMission } from "@/components/sections/OmaMission";
import { EventDetails } from "@/components/sections/EventDetails";
import { Tickets } from "@/components/sections/Tickets";
import { Sponsors } from "@/components/sections/Sponsors";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <OmaMission />
      <EventDetails />
      <Tickets />
      <Sponsors />
      <Footer />
    </main>
  );
}
