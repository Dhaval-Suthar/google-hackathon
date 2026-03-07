import type { PageDefinition } from "./types";

const aboutPage: PageDefinition = {
  layout: [
    {
      row: 3,
      col: 2,
      rowSpan: 2,
      colSpan: 35,
      color: "blue",
      texture: "jaali",
      content: (
        <div className="text-white select-none w-full h-full flex items-center justify-center px-[clamp(0.75rem,3vmin,2rem)] text-center">
          <div className="text-[clamp(1.5rem,5.5vmin,3.75rem)] font-bold navbar-font tracking-wide">
            About The Event
          </div>
        </div>
      ),
    },
    {
      row: 6,
      col: 2,
      rowSpan: 4,
      colSpan: 16,
      color: "yellow",
      texture: "blockprint",
      content: (
        <div className="text-black select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,2.2vmin,1.5rem)] py-[clamp(0.5rem,1.8vmin,1.25rem)]">
          <div className="navbar-font text-[clamp(1.125rem,3.5vmin,2.25rem)] mb-[clamp(0.25rem,1vmin,0.75rem)] font-bold">Mission</div>
          <div className="font-sans text-[clamp(0.7rem,1.7vmin,1.125rem)] leading-relaxed opacity-80">
            Build an ambitious, collaborative hackathon where students create meaningful solutions and learn by shipping.
          </div>
        </div>
      ),
    },
    {
      row: 6,
      col: 19,
      rowSpan: 4,
      colSpan: 18,
      color: "white",
      texture: "jaali",
      content: (
        <div className="text-black select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,2.2vmin,1.5rem)] py-[clamp(0.5rem,1.8vmin,1.25rem)]">
          <div className="navbar-font text-[clamp(1.125rem,3.5vmin,2.25rem)] mb-[clamp(0.25rem,1vmin,0.75rem)] font-bold">Vision</div>
          <div className="font-sans text-[clamp(0.7rem,1.7vmin,1.125rem)] leading-relaxed opacity-80">
            Grow a campus-first innovation space powered by mentorship, experimentation, and strong community support.
          </div>
        </div>
      ),
    },
    {
      row: 11,
      col: 2,
      rowSpan: 4,
      colSpan: 17,
      color: "blue",
      texture: "bandhani",
      content: (
        <div className="text-white select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,2.2vmin,1.5rem)] py-[clamp(0.5rem,1.8vmin,1.25rem)]">
          <div className="navbar-font text-[clamp(1.125rem,3.5vmin,2.25rem)] mb-[clamp(0.25rem,1vmin,0.75rem)] font-bold">CSI SFIT</div>
          <div className="font-sans text-[clamp(0.7rem,1.7vmin,1.125rem)] leading-relaxed opacity-90">
            Academic and technical community partner helping anchor campus innovation, execution, and student participation.
          </div>
        </div>
      ),
    },
    {
      row: 11,
      col: 20,
      rowSpan: 4,
      colSpan: 17,
      color: "ember",
      texture: "chikankari",
      content: (
        <div className="text-white select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,2.2vmin,1.5rem)] py-[clamp(0.5rem,1.8vmin,1.25rem)]">
          <div className="navbar-font text-[clamp(1.125rem,3.5vmin,2.25rem)] mb-[clamp(0.25rem,1vmin,0.75rem)] font-bold">GDG SFIT</div>
          <div className="font-sans text-[clamp(0.7rem,1.7vmin,1.125rem)] leading-relaxed opacity-90">
            Developer community partner bringing mentorship, outreach, and ecosystem energy to the hackathon experience.
          </div>
        </div>
      ),
    },
    {
      row: 16,
      col: 2,
      rowSpan: 4,
      colSpan: 11,
      color: "yellow",
      texture: "jaali",
      content: (
        <div className="text-black select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,1.8vmin,1.25rem)] py-[clamp(0.375rem,1.5vmin,1rem)]">
          <div className="navbar-font text-[clamp(1rem,2.8vmin,1.875rem)] mb-[clamp(0.125rem,0.75vmin,0.5rem)] font-bold">Program</div>
          <div className="font-sans text-[clamp(0.625rem,1.5vmin,1rem)] leading-relaxed opacity-80">Event flow, problem tracks, and judge coordination.</div>
        </div>
      ),
    },
    {
      row: 16,
      col: 14,
      rowSpan: 4,
      colSpan: 11,
      color: "violet",
      texture: "ikat",
      content: (
        <div className="text-white select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,1.8vmin,1.25rem)] py-[clamp(0.375rem,1.5vmin,1rem)]">
          <div className="navbar-font text-[clamp(1rem,2.8vmin,1.875rem)] mb-[clamp(0.125rem,0.75vmin,0.5rem)] font-bold">Operations</div>
          <div className="font-sans text-[clamp(0.625rem,1.5vmin,1rem)] leading-relaxed opacity-80">Logistics, volunteer management, and venue readiness.</div>
        </div>
      ),
    },
    {
      row: 16,
      col: 26,
      rowSpan: 4,
      colSpan: 11,
      color: "brown",
      texture: "blockprint",
      content: (
        <div className="text-white select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,1.8vmin,1.25rem)] py-[clamp(0.375rem,1.5vmin,1rem)]">
          <div className="navbar-font text-[clamp(1rem,2.8vmin,1.875rem)] mb-[clamp(0.125rem,0.75vmin,0.5rem)] font-bold">Community</div>
          <div className="font-sans text-[clamp(0.625rem,1.5vmin,1rem)] leading-relaxed opacity-80">Outreach, mentorship, sponsor touchpoints, and participant support.</div>
        </div>
      ),
    },
    {
      row: 21,
      col: 3,
      rowSpan: 1,
      colSpan: 33,
      color: "black",
      texture: "jaali",
      content: (
        <div className="text-white select-none w-full h-full flex items-center justify-center px-[clamp(0.5rem,2.2vmin,1.5rem)] text-center">
          <div className="font-sans text-[clamp(0.7rem,1.7vmin,1.125rem)] opacity-90">
            A joint effort by CSI SFIT and GDG SFIT to build a practical, high-energy hackathon for student builders.
          </div>
        </div>
      ),
    },
  ],
};

export default aboutPage;
