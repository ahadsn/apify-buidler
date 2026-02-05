export class CacheNode<K, V> {
  key: K;
  value: V;
  prev: CacheNode<K, V> | null = null;
  next: CacheNode<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, CacheNode<K, V>>;
  private head: CacheNode<K, V>;
  private tail: CacheNode<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();

    this.head = new CacheNode<K, V>(null as any, null as any);
    this.tail = new CacheNode<K, V>(null as any, null as any);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private remove(node: CacheNode<K, V>): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insertFront(node: CacheNode<K, V>): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  get(key: K): V | null {
    const node = this.cache.get(key);
    if (!node) return null;
    this.remove(node);
    this.insertFront(node);
    return node.value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.remove(node);
      this.insertFront(node);
      return;
    }

    if (this.cache.size === this.capacity) {
      const lru = this.tail.prev!;
      this.remove(lru);
      this.cache.delete(lru.key);
    }

    const newNode = new CacheNode<K, V>(key, value);
    this.cache.set(key, newNode);
    this.insertFront(newNode);
  }
}