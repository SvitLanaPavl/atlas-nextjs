// ui/topic/new/page.tsx
import { addTopic } from '@/lib/actions';
import Link from 'next/link';

export default function NewTopicPage() {
  return (
    <div>
      <h1 className="mb-4 text-xl md:text-2xl">New Topic</h1>
      <form action={addTopic}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="title"
                name="title"
                placeholder="Enter topic title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                type="text"
                required
              />
            </div>
          </div>
        </div>

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
