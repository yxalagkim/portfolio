import { Hero, About, Project, Collab, Mindset } from '@/components/section';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Project />
      <Collab />
      <Mindset />
      <Footer />
    </>
  );
}
