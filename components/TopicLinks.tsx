'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import TopicLink from './TopicLink';

export default function TopicLinks({ onNewTopic }: { onNewTopic?: (newTopic: any) => void }) {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      const { data: topicsData, error } = await supabase.from('topics').select('*');

      if (error) {
        console.error('Error fetching topics:', error.message);
      } else {
        setTopics(topicsData || []);
      }
      setLoading(false);
    };

    fetchTopics();
  }, []);

  // Handle new topic addition
  const handleNewTopic = (newTopic: any) => {
    setTopics((prevTopics) => [...prevTopics, newTopic]);
  };

  // Pass the function to parent if needed
  useEffect(() => {
    if (onNewTopic) {
      onNewTopic(handleNewTopic);
    }
  }, [onNewTopic]);

  // Loading state
  if (loading) return <div>Loading topics...</div>;

  // No topics found state
  if (!topics || topics.length === 0) return <div>No topics found</div>;

  // Render topics
  return (
    <>
      {topics.map((topic) => (
        <TopicLink key={topic.id} id={topic.id} title={topic.title} />
      ))}
    </>
  );
}
