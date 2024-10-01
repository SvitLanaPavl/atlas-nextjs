'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import TopicLink from './TopicLink';
import TopicLinkSkeleton from './Skeletons';

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

  const handleNewTopic = (newTopic: any) => {
    setTopics((prevTopics) => [...prevTopics, newTopic]);
  };

  useEffect(() => {
    if (onNewTopic) {
      onNewTopic(handleNewTopic);
    }
  }, [onNewTopic]);

  // Loading state
  if (loading) return (
    <div className="space-y-4">
        <TopicLinkSkeleton />
        <TopicLinkSkeleton />
        <TopicLinkSkeleton />
        <TopicLinkSkeleton />
      </div>
  );

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
