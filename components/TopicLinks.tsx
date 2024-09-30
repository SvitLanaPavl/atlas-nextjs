import { supabase } from '@/lib/supabaseClient';
import TopicLink from "./TopicLink";

export default async function TopicLinks() {
  // Fetch the topics from the database
  const { data: topics, error } = await supabase.from('topics').select('*');

  if (error) {
    console.error('Error fetching topics:', error.message);
    return <div>Error fetching topics</div>;
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
