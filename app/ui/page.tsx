import { ReactNode } from 'react';

interface UIPageProps {
  children?: ReactNode;
}

export default function UIPage({ children }: UIPageProps) {
  return (
    <>
      {children}
    </>  
  );
}
