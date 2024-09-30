'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function NewTopicPage() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Insert the new topic into the database
    const { data, error } = await supabase
      .from('topics')
      .insert([{ title }])
      .select()
      .single();

    if (error) {
      setError('Failed to create topic. Please try again.');
      return;
    }

    // Refresh the sidebar to show the new topic
    if (data?.id) {
      router.refresh(); // This will ensure the sidebar is refreshed
      router.push(`/ui/topics/${data.id}`); // Redirect to the newly created topic page
    } else {
      setError('Failed to get topic ID.');
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-xl md:text-2xl">New Topic</h1>
      <form onSubmit={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="title"
                placeholder="Enter topic title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/ui"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:brightness-110"
          >
            Create Topic
          </button>
        </div>
      </form>
    </div>
  );
}
