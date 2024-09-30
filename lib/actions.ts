// Define your server actions here
"use server";

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addTopic(formData: FormData) {
  const title = formData.get("title") as string;

  const { data, error } = await supabase
    .from('topics')
    .insert([{ title }])
    .select()
    .single();

  if (error) {
    console.error('Failed to create topic', error);
    throw new Error('Failed to create topic.');
  }

  // Revalidate and redirect to the new topic
  revalidatePath('/ui');
  redirect(`/ui/topics/${data?.id}`);
}

export async function fetchQuestions(topicId: string) {
  const { data: questionsData, error } = await supabase
    .from('questions')
    .select('*')
    .eq('topic_id', topicId)
    .order('votes', { ascending: false });

  if (error) {
    console.error('Error fetching questions:', error.message);
    throw new Error('Failed to fetch questions.');
  }

  return questionsData;
}

export async function addQuestion(question: FormData) {
  const title = question.get("title") as string;
  const topicId = question.get("topic_id") as string;

  const { error } = await supabase
    .from('questions')
    .insert([{ title, topic_id: topicId, votes: 0 }]);

  if (error) {
    console.error('Error adding question:', error.message);
    throw new Error('Failed to add question.');
  }

  revalidatePath(`/ui/topics/${topicId}`);
}

export async function fetchTopic(id: string) {
  const { data: topicData, error } = await supabase
    .from('topics')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Failed to fetch topic');
  }

  return topicData;
}

export async function voteForQuestion(questionId: string) {
  // Fetch the current votes for the specific question
  const { data: currentData, error: fetchError } = await supabase
    .from('questions')
    .select('votes')
    .eq('id', questionId)
    .single();

  if (fetchError) {
    console.error('Error fetching votes:', fetchError.message);
    throw new Error('Failed to fetch current votes.');
  }

  // Increment the votes by 1
  const newVotes = currentData.votes + 1;

  // Update the votes in the database
  const { error: updateError } = await supabase
    .from('questions')
    .update({ votes: newVotes })
    .eq('id', questionId);

  if (updateError) {
    console.error('Error updating votes:', updateError.message);
    throw new Error('Failed to update votes.');
  }
}