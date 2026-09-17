import Hero from '../components/Hero';

export default function Home({ booted }: { booted: boolean }) {
  return (
    <>
      <Hero booted={booted} />
    </>
  );
}
