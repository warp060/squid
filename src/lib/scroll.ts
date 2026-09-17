import type { NavigateFunction } from 'react-router-dom';

export function scrollToSection(navigate: NavigateFunction, pathname: string, id: string) {
  if (pathname !== '/') {
    navigate(`/#${id}`);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
