import { AskQuestionSkeleton, QuestionSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className='space-y-4'>
      <AskQuestionSkeleton />
      <QuestionSkeleton />
      <QuestionSkeleton />
    </div>
  )

}
