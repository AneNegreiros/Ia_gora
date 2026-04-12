import { useEffect, useRef, useState } from 'react';

export function useSecretGesture(onUnlock: () => void) {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const swipeCount = useRef(0);
  const swipeTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);

      // Inicia o timer de pressão longa (3 segundos)
      longPressTimer.current = setTimeout(() => {
        onUnlock();
      }, 3000);
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Cancela a pressão longa se o usuário mover o dedo
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      if (touchStartY === null) return;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchEndY - touchStartY;

      // Detecta arrasto para baixo (> 50px)
      if (deltaY > 50 && touchStartY < 100) {
        swipeCount.current += 1;

        // Se arrastou 2 vezes em menos de 1 segundo, desbloqueia
        if (swipeCount.current === 2) {
          onUnlock();
          swipeCount.current = 0;
          if (swipeTimer.current) {
            clearTimeout(swipeTimer.current);
          }
        } else {
          // Reseta o contador após 1 segundo
          if (swipeTimer.current) {
            clearTimeout(swipeTimer.current);
          }
          swipeTimer.current = setTimeout(() => {
            swipeCount.current = 0;
          }, 1000);
        }

        setTouchStartY(null);
      }
    };

    const handleTouchEnd = () => {
      // Cancela a pressão longa
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      setTouchStartY(null);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (swipeTimer.current) clearTimeout(swipeTimer.current);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };
  }, [touchStartY, onUnlock]);

  // Adiciona suporte para mouse (desenvolvimento)
  useEffect(() => {
    let mouseDownTime: number | null = null;
    let mouseDownTimer: NodeJS.Timeout | null = null;

    const handleMouseDown = (e: MouseEvent) => {
      mouseDownTime = Date.now();

      // Detecta pressão longa com mouse (segure Shift + Clique por 3s)
      if (e.shiftKey) {
        mouseDownTimer = setTimeout(() => {
          onUnlock();
        }, 3000);
      }
    };

    const handleMouseUp = () => {
      if (mouseDownTimer) {
        clearTimeout(mouseDownTimer);
        mouseDownTimer = null;
      }
      mouseDownTime = null;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (mouseDownTimer) clearTimeout(mouseDownTimer);
    };
  }, [onUnlock]);
}
