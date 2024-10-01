import { NextResponse } from 'next/server';
import { addTopic } from '@/lib/actions';

export async function POST(req: Request) {
  const formData = await req.formData();
  const topic = await addTopic(formData);

  // Ensure the topic has an ID (UUID)
  if (topic && topic.id) {
    return NextResponse.json({ id: topic.id });
  }

  return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
}
