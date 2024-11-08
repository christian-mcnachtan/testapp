export interface ToDoItem {
    id: number;
    title: string;
    created: Date;
    content?: string | null;
    priority: boolean;
    completed: boolean;
    published: boolean;
    authorId?: number | null;
  }
  