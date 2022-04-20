class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  add(y, x) {
    let node = new Node(y, x);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }
  shift() {
    let node = this.head;
    this.head = this.head.next;
    return [node.y, node.x];
  }
  isEmpty() {
    return this.head;
  }
}

class Node {
  constructor(y, x, next = null) {
    this.y = y;
    this.x = x;
    this.next = next;
  }
}

export default Queue;
