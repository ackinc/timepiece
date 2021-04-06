export function get(keys) {
  return new Promise((resolve) => chrome.storage.sync.get(keys, resolve));
}

export function set(data) {
  return new Promise((resolve) => chrome.storage.sync.set(data, resolve));
}

export function remove(keys) {
  return new Promise((resolve) => chrome.storage.sync.remove(keys, resolve));
}

export function clear() {
  return new Promise((resolve) => chrome.storage.sync.clear(resolve));
}
