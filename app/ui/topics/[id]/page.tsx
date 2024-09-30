// ui/topics/[id]/page.tsx

import { supabase } from '@/lib/supabaseClient';

type Props = {
  params: {
    id: string;
  };
};

export default async function TopicPage({ params }: Props) {
  // Fetch the topic details based on the topic ID
  const { data: topic, error: topicError } = await supabase
    .from('topics')
    .select('*')
    .eq('id', params.id)
    .single();

  if (topicError) {
    console.error('Error fetching topic:', topicError.message);
    return <div>Error fetching topic</div>;
  }

  // Fetch questions related to the topic
  const { data: questions, error: questionError } = await supabase
    .from('questions')
    .select('*')
    .eq('topic_id', params.id)
    .order('votes', { ascending: false });

  if (questionError) {
    console.error('Error fetching questions:', questionError.message);
    return <div>Error fetching questions</div>;
  }

  return (
    <div>
      <h1 className='text-3xl font-black'>{topic.title}</h1>
      {questions && questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <p>{question.title}</p>
              <p>Votes: {question.votes}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available for this topic.</p>
      )}
    </div>
  );
}
