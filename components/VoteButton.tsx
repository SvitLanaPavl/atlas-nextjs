import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import { voteForQuestion } from '@/lib/actions';

type VoteButtonProps = {
  id: string;
  onVote: () => void;
};

export default function VoteButton({ id, onVote }: VoteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the server action to update the vote count
      await voteForQuestion(id);
      onVote(); // Trigger the parent function to refresh the vote count for the specific question
    } catch (error) {
      console.error('Error voting for question:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      className={`h-8 w-8 min-w-[2rem] rounded-full ring-gray-200 hover:text-atlas-teal active:bg-primary active:text-white active:outline-none active:ring-2 active:ring-primary ${loading ? 'opacity-50' : ''}`}
      disabled={loading}
    >
      <HandThumbUpIcon />
    </button>
  );
}
