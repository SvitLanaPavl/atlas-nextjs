import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function AskQuestion({ topic_id, onQuestionAdded }: { topic_id: string; onQuestionAdded: () => void }) {
  const [questionTitle, setQuestionTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (questionTitle.trim()) {
      const { error } = await supabase
        .from('questions')
        .insert([{ title: questionTitle, topic_id: topic_id, votes: 0 }]);

      if (error) {
        console.error('Error adding question:', error.message);
      } else {
        setQuestionTitle('');
        onQuestionAdded(); // Notify parent to re-fetch questions
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative my-8">
      <input
        type="text"
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
        placeholder="Ask a question"
        className="mt-1 block w-full rounded-md border border-atlas-white-300 bg-inherit py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-atlas-teal"
      />
      <button className="absolute right-2 top-2 flex h-10 w-24 items-center justify-center rounded-md border bg-secondary px-4 text-lg text-white focus:bg-secondary hover:bg-primary transition ease-in-out">
        Ask
      </button>
    </form>
  );
}
