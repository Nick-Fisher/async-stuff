import { Node } from './node';
import { ILinkedList } from './types';

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  private length: number = 0;

  append(element: T): void {
    //if (this.tail) this.tail.next = new Node(element);
  }
}
