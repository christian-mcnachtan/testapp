import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newToDo = await prisma.todo.create({
      data: {
        title: body.title,
        content: body.content,
        completed: body.completed || false,
      },
    });
    return NextResponse.json(newToDo, { status: 201 });
  } catch (error) {
    console.error('Error creating to-do:', error);
    return NextResponse.json({ error: 'Error creating to-do item' }, { status: 500 });
  }
}