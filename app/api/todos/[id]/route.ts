import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    const updatedToDo = await prisma.todo.update({
      where: { id },
      data: { completed: true },
    });
    return NextResponse.json(updatedToDo, { status: 200 });
  } catch (error) {
    console.error('Error updating to-do:', error);
    return NextResponse.json({ error: 'Error updating to-do item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'To-do deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting to-do:', error);
    return NextResponse.json({ error: 'Error deleting to-do item' }, { status: 500 });
  }
}
