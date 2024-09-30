// ui/topics/[id]/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { Question } from '@/components/Question';
import { AskQuestion } from '@/components/AskQuestion';

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
      {/* Topic Title */}
      <h1 className="text-3xl font-black flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="h-6 w-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
          />
        </svg>
        {topic.title}
      </h1>

      {/* Ask a Question form */}
      <AskQuestion topic={topic.id} />

      {/* List of questions */}
      <div className="mt-8">
        {questions && questions.length > 0 ? (
          questions.map((question) => (
            <Question
              key={question.id}
              id={question.id}
              text={question.title}
              votes={question.votes}
            />
          ))
        ) : (
          <p>No questions available for this topic.</p>
        )}
      </div>
    </div>
  );
}
