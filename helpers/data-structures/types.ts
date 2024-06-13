export interface INode<T> {
  next: INode<T> | null;
  value: T;
}

export interface ILinkedList<T> {
  head: INode<T> | null;
  length: number;

  append(element: T): void;
  prepend(element: T): void;
  remove(value: T): void;
  find(value: T): INode<T> | null;
  size(): number;
}

export interface IQueue<T> {
  enqueue(element: T): void;
  dequeue(): void;
  isEmpty(): boolean;
  size(): number;
  peek(): T | undefined;
}
