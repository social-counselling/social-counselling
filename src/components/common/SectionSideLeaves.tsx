import Image from "next/image";

export default function SectionSideLeaves() {
  return (
    <>
      {/* LEFT SIDE HANGING LEAVES */}
      <Image
        src="/images/decorations/section-leaf-left.png"
        alt=""
        width={220}
        height={1200}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-[90px]
          z-0
          h-[calc(100%-90px)]
          w-[65px]
          object-fill
          opacity-55

          sm:top-[100px]
          sm:h-[calc(100%-100px)]
           sm:w-[55px]

          md:w-[65px]

          lg:w-[75px]

          xl:w-[85px]
        "
      />

      {/* RIGHT SIDE HANGING LEAVES */}
      <Image
        src="/images/decorations/section-leaf-right.png"
        alt=""
        width={220}
        height={1200}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-[90px]
          z-0
          h-[calc(100%-90px)]
          w-[65px]
          object-fill
          opacity-55

          sm:top-[100px]
          sm:h-[calc(100%-100px)]
          sm:w-[55px]

          md:w-[65px]

          lg:w-[75px]

          xl:w-[85px]
        "
      />
    </>
  );
}