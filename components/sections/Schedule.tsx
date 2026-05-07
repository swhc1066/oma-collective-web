import { BloomSection } from "./BloomSection";
import { event } from "@/lib/content";

export function Schedule() {
  return (
    <BloomSection
      id="schedule"
      shape="chartreuse"
      textColor="text-[var(--color-bg-maroon)]"
    >
      <p className="font-display text-sm tracking-[0.3em]">THE EVENING</p>
      <h2 id="schedule-heading" className="mt-6 font-display text-6xl sm:text-8xl">
        Run of show
      </h2>
      <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 text-lg">
        <dt className="font-display tracking-widest">{event.time.doors}</dt>
        <dd>Doors &amp; cocktails</dd>
        <dt className="font-display tracking-widest">{event.time.dinner}</dt>
        <dd>Seated dinner</dd>
        <dt className="font-display tracking-widest">{event.time.program}</dt>
        <dd>Program &amp; remarks</dd>
      </dl>
    </BloomSection>
  );
}
