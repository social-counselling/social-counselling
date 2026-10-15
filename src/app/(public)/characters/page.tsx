import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Meet Our Social Counselling Universe",
  description:
    "Meet the Social Counselling characters and explore the qualities they represent: wisdom, empathy, courage, clarity, resilience, hope, gratitude, patience and curiosity.",
};

const characters = [
  {
    number: "01",
    name: "Mr Wise",
    image: "/images/characters/mr-wise.webp",
    qualities: ["Wisdom", "Perspective", "Conscious Thinking"],
    quote:
      "Wisdom is not knowing everything. It is knowing that there is always more to understand.",
    description:
      "Mr Wise reminds us to pause before we conclude, look beyond the obvious and consider the larger picture. He believes that a thoughtful mind does not rush to judgement — it first seeks to understand.",
  },
  {
    number: "02",
    name: "Ms Empathy",
    image: "/images/characters/ms-empathy.webp",
    qualities: ["Understanding", "Compassion", "Connection"],
    quote:
      "Sometimes, being understood is the first step towards feeling better.",
    description:
      "Ms Empathy reminds us that listening is more than hearing words. It is making an effort to understand what another person may be experiencing — without immediately judging, correcting or solving.",
  },
  {
    number: "03",
    name: "Mr Courage",
    image: "/images/characters/mr-courage.webp",
    qualities: ["Courage", "Action", "Conviction"],
    quote:
      "Courage is the willingness and enthusiasm of a person to move forward despite uncertainty.",
    description:
      "Mr Courage reminds us that some decisions require us to step beyond the comfort zone, confront what needs to be confronted responsibly and take accountability for the choices we make.",
  },
  {
    number: "04",
    name: "Ms Clarity",
    image: "/images/characters/ms-clarity.webp",
    qualities: ["Clarity", "Understanding", "Direction"],
    quote:
      "When thoughts are tangled, the first step is not to find answers — it is to peel off the clutter first and define the correct problem statement.",
    description:
      "Ms Clarity encourages us to separate facts from assumptions, emotions from realities and immediate concerns from the bigger picture.",
  },
  {
    number: "05",
    name: "Ms Resilience",
    image: "/images/characters/ms-resilience.webp",
    qualities: ["Resilience", "Adaptation", "Perseverance"],
    quote:
      "Life may change the circumstances. Resilience helps us change how we respond.",
    description:
      "Continuing steadily towards a goal is perseverance. Resilience is the ability to bounce back and move forward despite adversity or setbacks. Ms Resilience reminds us that moving forward does not always mean forgetting what happened. Sometimes it means accepting what has changed, finding our strength again and taking the next step.",
  },
  {
    number: "06",
    name: "Mrs Hope",
    image: "/images/characters/mrs-hope.webp",
    qualities: ["Hope", "Possibility", "Purpose"],
    quote: "A new chapter does not have to be a continuation of the old one.",
    description:
      "Mrs Hope reminds us that even when circumstances change, possibilities remain. She encourages us to look ahead with optimism, discover purpose and believe that there can still be something meaningful to move towards. Continuing to look forward and seek opportunities even in adverse circumstances is hope.",
  },
  {
    number: "07",
    name: "Mr Gratitude",
    image: "/images/characters/mr-gratitude.webp",
    qualities: ["Gratitude", "Appreciation", "Contentment"],
    quote:
      "We often notice what is missing before we notice what is already there.",
    description:
      "Mr Gratitude reminds us to recognise the people, experiences and simple things that bring meaning to our lives. Gratitude does not ignore life's difficulties — it helps us see the good alongside them.",
  },
  {
    number: "08",
    name: "Ms Patience",
    image: "/images/characters/ms-patience.webp",
    qualities: ["Patience", "Composure", "Understanding"],
    quote:
      "Not everything needs an immediate answer. Not every situation needs an immediate reaction.",
    description:
      "Ms Patience reminds us of the value of pausing, listening and allowing circumstances to unfold before responding. Sometimes, a little patience creates the space needed for a much better response.",
  },
  {
    number: "09",
    name: "Mr Seeker",
    image: "/images/characters/mr-seeker.webp",
    qualities: ["Curiosity", "Reflection", "Discovery"],
    quote: "A better question can sometimes take us further than a quick answer.",
    description:
      "Mr Seeker represents the willingness to ask, explore and look again. He reminds us that questioning our own assumptions is not weakness — it is often the beginning of understanding.",
  },
  {
    number: "10",
    name: "Young Explorer 1",
    image: "/images/characters/young-explorer-1.webp",
    qualities: ["Curiosity", "Learning", "Possibility"],
    quote:
      "Growing begins when we become willing to explore beyond what we already know.",
    description:
      "Young Explorer reminds us to remain curious, learn from experiences and approach the world with an open mind. Every new experience can teach us something — if we are willing to discover it.",
    extra:
      "Young people have the advantage of curiosity, energy and the willingness to explore. But what can make that journey even more meaningful is having someone who can share the benefit of experience, perspective and wisdom in a way they can relate to. Such counselling sessions can help them learn from experiences, understand situations more consciously and become better prepared to face life's challenges with greater calmness and right thinking.",
  },
  {
    number: "11",
    name: "Young Explorer 2",
    image: "/images/characters/young-explorer-2.webp",
    qualities: ["Confidence", "Discovery", "Growth"],
    quote:
      "There is always something new to discover — including something new about ourselves.",
    description:
      "Young Explorer represents the confidence to step forward, try, learn and grow. The journey may not always be predictable, but every thoughtful step adds to who we become.",
    extra:
      "Young people have the advantage of curiosity, energy and the willingness to explore. But what can make that journey even more meaningful is having someone who can share the benefit of experience, perspective and wisdom in a way they can relate to. Such counselling sessions can help them learn from experiences, understand situations more consciously and become better prepared to face life's challenges with greater calmness and right thinking.",
  },
];

export default function CharactersPage() {
  return (
    <main className="bg-[#f7faf8] text-[#183b3b]">
      <section className="relative overflow-hidden bg-[#103f3b] px-5 py-16 text-white sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-white/10" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
            Different people. Different qualities.
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Meet Our Social Counselling Universe
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Better perspectives begin with understanding the qualities within us.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
            Every one of us carries different qualities within us — wisdom, courage,
            patience, empathy, clarity, resilience, gratitude, hope and more. Our
            characters represent qualities that can help us think better, understand
            better and live better within our social fabric.
          </p>
          <p className="mt-6 text-sm font-medium text-emerald-100">
            Get to know each of them. Perhaps you may recognise a little of yourself in one.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#238b78]">
                Get to know them
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Eleven characters, many perspectives
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              We all need different qualities at different moments in life. Explore the
              qualities each character brings to the conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {characters.map((character) => (
              <article
                key={character.number}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#dce9e4] bg-white shadow-[0_5px_24px_rgba(16,63,59,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(16,63,59,0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#eef5ef] via-[#f8f8f0] to-[#e4efea] sm:aspect-[5/4]">
                  <div className="absolute inset-x-8 bottom-0 h-8 rounded-full bg-[#103f3b]/10 blur-xl" />
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain object-bottom px-5 pt-4 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-[#42736a] shadow-sm backdrop-blur">
                    CHARACTER {character.number}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#183b3b]">
                    {character.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {character.qualities.map((quality) => (
                      <span
                        key={quality}
                        className="rounded-full bg-[#eaf5f0] px-3 py-1.5 text-xs font-medium text-[#287263]"
                      >
                        {quality}
                      </span>
                    ))}
                  </div>
                  <blockquote className="mt-5 border-l-2 border-[#8fc8b5] pl-4 text-[15px] font-medium leading-7 text-[#315b54]">
                    {character.quote}
                  </blockquote>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {character.description}
                  </p>
                  {character.extra ? (
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {character.extra}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#e9f3ed] px-6 py-10 text-center sm:px-12 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287263]">
            A moment to reflect
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#183b3b] sm:text-4xl">
            Which one are you today?
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-1 text-sm leading-7 text-slate-700 sm:text-base">
            <p>Perhaps you need the patience to pause.</p>
            <p>Perhaps the courage to act.</p>
            <p>Perhaps the clarity to understand.</p>
            <p>Perhaps the resilience to continue.</p>
            <p>Perhaps simply someone to listen.</p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Social Counselling seeks to help individuals discover these qualities within
            themselves — and use them consciously in their thoughts and actions.
          </p>
        </div>
      </section>
    </main>
  );
}
