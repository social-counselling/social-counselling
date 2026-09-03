import HeroSection from "@/components/home/HeroSection";
import HomeIntroductionSection from "@/components/home/HomeIntroductionSection";
import SocialCounsellingSection from "@/components/home/SocialCounsellingSection";
import PrinciplesSection from "@/components/home/PrinciplesSection";
import IndividualitySection from "@/components/home/IndividualitySection";
import CounsellingHelpSection from "@/components/home/CounsellingHelpSection";
import OurRoleSection from "@/components/home/OurRoleSection";
import LargerPurposeSection from "@/components/home/LargerPurposeSection";
import HomeClosingSection from "@/components/home/HomeClosingSection";


export default function HomePage() {
  return (
    <main>

      <HeroSection />

      <HomeIntroductionSection />

      <SocialCounsellingSection />

      <PrinciplesSection />

      <IndividualitySection />

      <CounsellingHelpSection />

      <OurRoleSection />

      <LargerPurposeSection />

      <HomeClosingSection />
    </main>
  );
}