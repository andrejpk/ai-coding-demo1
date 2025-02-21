import { gitService } from '@/lib/services';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const repositories = await gitService.getRepositories();
    return NextResponse.json(repositories);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const repository = await gitService.createRepository(data);
    return NextResponse.json(repository);
  } catch (error) {
    console.error('Error creating repository:', error);
    return NextResponse.json(
      { error: 'Failed to create repository' },
      { status: 500 }
    );
  }
} 