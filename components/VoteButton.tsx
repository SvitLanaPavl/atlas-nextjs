import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

type VoteButtonProps = {
  id: string;
  onVote: () => void;
};

export default function VoteButton({ id, onVote }: VoteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);

    // Fetch the current votes for the specific question
    const { data: currentData, error: fetchError } = await supabase
      .from('questions')
      .select('votes')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching votes:', fetchError.message);
      setLoading(false);
      return;
    }

    // Increment the votes by 1 for the specific question
    const newVotes = currentData.votes + 1;

    // Update the votes in the database for the specific question
    const { error: updateError } = await supabase
      .from('questions')
      .update({ votes: newVotes })
      .eq('id', id); // Ensure updating the correct question by its ID

    if (updateError) {
      console.error('Error updating votes:', updateError.message);
    } else {
      onVote(); // Trigger the parent function to refresh the vote count for the specific question
    }

    setLoading(false);
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
