import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';

export async function PUT(req: NextRequest,  { params }: { params: Promise<{ id: string }>}) {
  try {
    const id = parseInt((await params).id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await req.json();
    const updatedToDo = await prisma.todo.update({
      where: { id },
      data: { completed: body.completed },
    });

    return NextResponse.json(updatedToDo, { status: 200 });
  } catch (error) {
    console.error('Error updating to-do:', error);
    return NextResponse.json({ error: 'Error updating to-do item' }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest,  { params }: { params: Promise<{ id: string }>}) {
  try {
    const id = parseInt((await params).id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await prisma.todo.delete({ where: { id } });

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error('Error deleting to-do:', error);
    return NextResponse.json({ error: 'Error deleting to-do item' }, { status: 500 });
  }
}
