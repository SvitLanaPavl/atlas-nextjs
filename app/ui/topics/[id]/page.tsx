'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Question } from '@/components/Question';
import { AskQuestion } from '@/components/AskQuestion';

type Props = {
  params: {
    id: string;
  };
};

export default function TopicPage({ params }: Props) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicAndQuestions = async () => {
      setLoading(true);
      
      const { data: topicData, error: topicError } = await supabase
        .from('topics')
        .select('*')
        .eq('id', params.id)
        .single();

      if (topicError) {
        console.error('Error fetching topic:', topicError.message);
      } else {
        setTopic(topicData);
      }

      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('topic_id', params.id)
        .order('votes', { ascending: false });

      if (questionsError) {
        console.error('Error fetching questions:', questionsError.message);
      } else {
        setQuestions(questionsData);
      }

      setLoading(false);
    };

    fetchTopicAndQuestions();
  }, [params.id]);

  const handleQuestionAdded = () => {
    // Re-fetch questions after a new question is added
    supabase
      .from('questions')
      .select('*')
      .eq('topic_id', params.id)
      .order('votes', { ascending: false })
      .then(({ data }) => {
        setQuestions(data || []);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Topic Title */}
      <h1 className="text-3xl font-black flex items-center">
        {topic?.title || 'Unknown Topic'}
      </h1>

      {/* Ask a Question form */}
      <AskQuestion topic_id={params.id} onQuestionAdded={handleQuestionAdded} />

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
