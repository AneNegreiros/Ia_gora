import { useEffect, ReactNode } from 'react';

export type DisguiseType = 'calculator' | 'weather' | 'notes' | 'none';

interface ChameleonModeProps {
  children: ReactNode;
}

export default function ChameleonMode({ children }: ChameleonModeProps) {
  useEffect(() => {
    // Carrega as configurações do localStorage
    const enabled = localStorage.getItem('chameleon-mode-enabled') === 'true';
    const type = (localStorage.getItem('chameleon-disguise-type') || 'none') as DisguiseType;

    if (enabled && type !== 'none') {
      // Muda o título e favicon da página baseado no disfarce
      updatePageAppearance(type);
    } else {
      // Restaura aparência original
      updatePageAppearance('none');
    }
  }, []);

  return <>{children}</>;
}

function updatePageAppearance(disguiseType: DisguiseType) {
  const disguises = {
    calculator: {
      title: 'Calculadora',
      icon: '🔢'
    },
    weather: {
      title: 'Clima',
      icon: '🌤️'
    },
    notes: {
      title: 'Notas',
      icon: '📝'
    },
    none: {
      title: 'IAgora',
      icon: '🌸'
    }
  };

  const disguise = disguises[disguiseType] || disguises.none;

  // Atualiza o título da página
  document.title = disguise.title;

  // Atualiza o favicon (emoji como favicon)
  let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  // Cria um SVG com o emoji como favicon
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <text y="75" font-size="80">${disguise.icon}</text>
    </svg>
  `;
  link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
}
