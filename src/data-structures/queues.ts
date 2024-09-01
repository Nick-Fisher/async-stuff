import { LinkedList } from './linked-list';
import { ILinkedList, IQueue } from './types';

export class QueueArray<T> implements IQueue<T> {
  private items: T[] = [];

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): void {
    this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }
}

export class QueueLinkedList<T> implements IQueue<T> {
  private list: ILinkedList<T>;

  constructor(list: ILinkedList<T>) {
    this.list = list;
  }
}
