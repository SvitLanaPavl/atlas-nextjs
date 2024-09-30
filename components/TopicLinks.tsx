'use client'; // Make this a client-side component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import TopicLink from './TopicLink';

export default function TopicLinks() {
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
  }, []); // The empty dependency array ensures this only runs once when the component is mounted

  // Display loading state if necessary
  if (loading) {
    return <div>Loading topics...</div>;
  }

  // If no topics were found, display a message
  if (!topics || topics.length === 0) {
    return <div>No topics found</div>;
  }

  // Render the list of topics dynamically
  return (
    <>
      {topics.map((topic) => (
        <TopicLink key={topic.id} id={topic.id} title={topic.title} />
      ))}
    </>
  );
}
