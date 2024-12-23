import React, { useRef } from 'react';
import { IonButton } from '@ionic/react';
import { createAnimation, Animation } from '@ionic/react';

const AnimatedButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const buttonRef = useRef<HTMLIonButtonElement>(null);
  const animationRef = useRef<Animation | null>(null);

  const playAnimation = () => {
    if (buttonRef.current) {
      const animation = createAnimation()
        .addElement(buttonRef.current)
        .duration(2000)
        .iterations(Infinity)
        .keyframes([
          {
            offset: 0,
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.5)',
          },
          {
            offset: 0.5,
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.5), 0 0 40px rgba(0, 255, 0, 0.5)',
          },
          {
            offset: 1,
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.5)',
          },
        ]);

      animation.play();
      animationRef.current = animation;
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      if (buttonRef.current) {
        buttonRef.current.style.boxShadow = 'none';
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-black">
      <IonButton
        color='#000'
        ref={buttonRef}
        onMouseEnter={playAnimation}
        onMouseLeave={stopAnimation}
        style={{
          width: '',
          height: '50px',
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: '10px',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        {children}
      </IonButton>
    </div>
  );
};

export default AnimatedButton;
