import { useEffect, useState } from 'react';

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>('home');
  const key = ids.join('|');
  useEffect(() => {
    const list = key.split('|');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    list.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);
  return active;
}
