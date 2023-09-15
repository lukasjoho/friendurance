'use client';
import { memo } from 'react';

const HomeTitle = memo(() => {
  return (
    <h1
      className="animate-fade-in font-tungsten uppercase leading-none"
      style={{
        fontSize: 'clamp(3rem, 15vw, 8rem)',
      }}
    >
      <span className="animate-fade-in">Unite </span>
      <span
        className="animate-fade-in"
        style={{
          animationDelay: '750ms',
        }}
      >
        to{' '}
      </span>
      <span
        className="animate-fade-in"
        style={{
          animationDelay: '1500ms',
        }}
      >
        compete
      </span>
    </h1>
  );
});

export default HomeTitle;
