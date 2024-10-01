"use client"; // Make sure this is a client component

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface TopicsContextType {
  addTopic: (newTopic: string) => void;
}

// Create a context with an empty initial value
const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

// Provider component to wrap around parts of the app that need topics context
export function TopicsProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<string[]>([]);

  const addTopic = (newTopic: string) => {
    setTopics([...topics, newTopic]);
  };

  return (
    <TopicsContext.Provider value={{ addTopic }}>
      {children}
    </TopicsContext.Provider>
  );
}

// Custom hook to use the Topics context
export function useTopics() {
  const context = useContext(TopicsContext);
  if (!context) {
    throw new Error('useTopics must be used within a TopicsProvider');
  }
  return context;
}
