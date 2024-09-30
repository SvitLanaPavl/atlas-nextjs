import VoteButton from "./VoteButton";

type QuestionProps = {
  id: string;
  text: string;
  votes: number;
  onVote: () => void;
};

export function Question({ id, text, votes, onVote }: QuestionProps) {
  return (
    <div className="flex items-center border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b">
      <div className="mr-2 rounded-xl bg-secondary px-2 text-sm text-white">
        {votes}
      </div>
      <p className="text w-full text-left font-semibold">{text}</p>
      <VoteButton id={id} onVote={onVote} />
    </div>
  );
}
