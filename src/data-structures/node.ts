import { INode } from './types';

export class Node<T> implements INode<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
