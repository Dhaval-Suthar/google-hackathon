import type { PageDefinition } from "./types";

const sponsorsPage: PageDefinition = {
  layout: [
    {
      row: 3,
      col: 2,
      rowSpan: 2,
      colSpan: 35,
      color: "yellow",
      texture: "chikankari",
      content: (
        <div className="text-black select-none w-full h-full flex items-center justify-center px-[clamp(0.75rem,3vmin,2rem)]">
          <div className="text-[clamp(1.5rem,5.5vmin,3.75rem)] font-bold navbar-font tracking-wide">
            Sponsors & Partners
          </div>
        </div>
      ),
    },
    {
      row: 6,
      col: 2,
      rowSpan: 4,
      colSpan: 16,
      color: "white",
      texture: "jaali",
      content: (
        <div className="text-black select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,2.2vmin,1.5rem)] py-[clamp(0.5rem,1.8vmin,1.25rem)]">
          <div className="navbar-font text-[clamp(1.125rem,3.5vmin,2.25rem)] mb-[clamp(0.25rem,1vmin,0.75rem)] font-bold">Title Partner</div>
          <div className="font-sans text-[clamp(1rem,2.8vmin,1.875rem)] font-bold">CSI SFIT</div>
          <div className="font-sans text-[clamp(0.7rem,1.7vmin,1.125rem)] mt-[clamp(0.25rem,1vmin,0.75rem)] opacity-75 leading-relaxed">
            Co-organizer, academic catalyst, and flagship campus innovation partner.
          </div>
        </div>
      ),
    },
    {
      row: 6,
      col: 19,
      rowSpan: 4,
      colSpan: 18,
      color: "blue",
      texture: "bandhani",
      content: (
        <div className="text-white select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,2.2vmin,1.5rem)] py-[clamp(0.5rem,1.8vmin,1.25rem)]">
          <div className="navbar-font text-[clamp(1.125rem,3.5vmin,2.25rem)] mb-[clamp(0.25rem,1vmin,0.75rem)] font-bold">Technology Partner</div>
          <div className="font-sans text-[clamp(1rem,2.8vmin,1.875rem)] font-bold">GDG SFIT</div>
          <div className="font-sans text-[clamp(0.7rem,1.7vmin,1.125rem)] mt-[clamp(0.25rem,1vmin,0.75rem)] opacity-90 leading-relaxed">
            Developer community partner powering outreach, mentorship, and ecosystem support.
          </div>
        </div>
      ),
    },
    {
      row: 11,
      col: 2,
      rowSpan: 4,
      colSpan: 11,
      color: "yellow",
      texture: "blockprint",
      content: (
        <div className="text-black select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,1.8vmin,1.25rem)] py-[clamp(0.375rem,1.5vmin,1rem)]">
          <div className="navbar-font text-[clamp(1rem,2.8vmin,1.875rem)] mb-[clamp(0.125rem,0.75vmin,0.5rem)] font-bold">Platinum</div>
          <div className="font-sans text-[clamp(0.75rem,1.85vmin,1.25rem)] font-bold">Reserved</div>
          <div className="font-sans text-[clamp(0.625rem,1.5vmin,1rem)] mt-[clamp(0.125rem,0.75vmin,0.5rem)] opacity-80 leading-relaxed">Premium brand visibility and keynote alignment.</div>
        </div>
      ),
    },
    {
      row: 11,
      col: 14,
      rowSpan: 4,
      colSpan: 11,
      color: "ember",
      texture: "blockprint",
      content: (
        <div className="text-white select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,1.8vmin,1.25rem)] py-[clamp(0.375rem,1.5vmin,1rem)]">
          <div className="navbar-font text-[clamp(1rem,2.8vmin,1.875rem)] mb-[clamp(0.125rem,0.75vmin,0.5rem)] font-bold">Gold</div>
          <div className="font-sans text-[clamp(0.75rem,1.85vmin,1.25rem)] font-bold">Reserved</div>
          <div className="font-sans text-[clamp(0.625rem,1.5vmin,1rem)] mt-[clamp(0.125rem,0.75vmin,0.5rem)] opacity-80 leading-relaxed">Workshop, mentor, and showcase opportunities.</div>
        </div>
      ),
    },
    {
      row: 11,
      col: 26,
      rowSpan: 4,
      colSpan: 11,
      color: "brown",
      texture: "chikankari",
      content: (
        <div className="text-white select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,1.8vmin,1.25rem)] py-[clamp(0.375rem,1.5vmin,1rem)]">
          <div className="navbar-font text-[clamp(1rem,2.8vmin,1.875rem)] mb-[clamp(0.125rem,0.75vmin,0.5rem)] font-bold">Silver</div>
          <div className="font-sans text-[clamp(0.75rem,1.85vmin,1.25rem)] font-bold">Open Sponsor Slot</div>
          <div className="font-sans text-[clamp(0.625rem,1.5vmin,1rem)] mt-[clamp(0.125rem,0.75vmin,0.5rem)] opacity-80 leading-relaxed">Looking for ecosystem, tooling, and hiring partners.</div>
        </div>
      ),
    },
    {
      row: 16,
      col: 2,
      rowSpan: 4,
      colSpan: 11,
      color: "violet",
      texture: "ikat",
      content: (
        <div className="text-white select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,1.8vmin,1.25rem)] py-[clamp(0.375rem,1.5vmin,1rem)]">
          <div className="navbar-font text-[clamp(1rem,2.8vmin,1.875rem)] mb-[clamp(0.125rem,0.75vmin,0.5rem)] font-bold">Bronze</div>
          <div className="font-sans text-[clamp(0.75rem,1.85vmin,1.25rem)] font-bold">Open Sponsor Slot</div>
          <div className="font-sans text-[clamp(0.625rem,1.5vmin,1rem)] mt-[clamp(0.125rem,0.75vmin,0.5rem)] opacity-80 leading-relaxed">Great for startups and community-backed teams.</div>
        </div>
      ),
    },
    {
      row: 16,
      col: 14,
      rowSpan: 4,
      colSpan: 23,
      color: "white",
      texture: "jaali",
      content: (
        <div className="text-black select-none w-full h-full flex flex-col justify-center px-[clamp(0.5rem,2.2vmin,1.5rem)] py-[clamp(0.5rem,1.8vmin,1.25rem)]">
          <div className="navbar-font text-[clamp(1.125rem,3.5vmin,2.25rem)] mb-[clamp(0.25rem,1.5vmin,1rem)] font-bold">Why Sponsor?</div>
          <div className="font-sans text-[clamp(0.75rem,1.85vmin,1.25rem)] leading-relaxed">
            Engage with builders, showcase developer tools, connect with top student talent,
            and align your brand with one of the campus flagship innovation events.
          </div>
        </div>
      ),
    },
    {
      row: 21,
      col: 3,
      rowSpan: 1,
      colSpan: 18,
      color: "black",
      texture: "jaali",
      content: (
        <div className="text-white select-none w-full h-full flex items-center justify-center px-[clamp(0.5rem,2.2vmin,1.5rem)] text-center">
          <div>
            <div className="navbar-font text-[clamp(1rem,2.8vmin,1.875rem)] mb-[clamp(0.125rem,0.75vmin,0.5rem)] font-bold">Become a Sponsor</div>
            <div className="font-sans text-[clamp(0.7rem,1.7vmin,1.125rem)] opacity-90">
              Reach out through the Contact page to partner with the hackathon.
            </div>
          </div>
        </div>
      ),
    },
  ],
};

export default sponsorsPage;
