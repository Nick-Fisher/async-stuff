import { Node } from './node';
import { ILinkedList, INode } from './types';

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  private length: number = 0;

  append(element: T): void {
    const newNode = new Node<T>(element);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      } else {
        this.tail = newNode;
      }
    }

    this.length++;
  }

  prepend(element: T): void {
    const newNode = new Node<T>(element);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const oldHead = this.head;

      this.head = newNode;
      this.head.next = oldHead;
    }
  }

  size(): number {
    return this.length;
  }

  remove(value: T): void {}

  find(value: T): INode<T> | null {
    if (!this.head) {
      return null;
    } else {
        
    }

    return null;
  }
}
