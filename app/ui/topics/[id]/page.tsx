'use client';
import { useEffect, useState } from 'react';
import { fetchQuestions, fetchTopic } from '@/lib/actions';
import { Question } from '@/components/Question';
import { AskQuestion } from '@/components/AskQuestion';
import Loading from '../../loading';

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

      try {
        // Fetch the topic
        const topicData = await fetchTopic(params.id);
        setTopic(topicData);

        // Fetch the questions
        const questionsData = await fetchQuestions(params.id);
        setQuestions(questionsData || []);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching data:', error.message);
        } else {
          console.error('An unknown error occurred.');
        }
      }

      setLoading(false);
    };

    fetchTopicAndQuestions();
  }, [params.id]);

  const handleQuestionAdded = () => {
    fetchQuestions(params.id).then((data) => {
      setQuestions(data || []);
    });
  };

  const handleVote = () => {
    fetchQuestions(params.id).then((data) => {
      setQuestions(data || []);
    });
  };

  if (loading) return <Loading />;

  return (
    <div>
      {/* Displaying the topic title */}
      <h1 className="text-3xl font-black flex items-center">
        {topic?.title || 'Unknown Topic'}
      </h1>

      <AskQuestion topic_id={params.id} onQuestionAdded={handleQuestionAdded} />

      <div className="mt-8">
        {questions && questions.length > 0 ? (
          questions.map((question) => (
            <Question
              key={question.id}
              id={question.id}
              text={question.title}
              votes={question.votes}
              onVote={handleVote}
            />
          ))
        ) : (
          <p>No questions available for this topic.</p>
        )}
      </div>
    </div>
  );
}
