import { createStore } from 'state-pool';
const store = createStore();

function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

store.persist({
  //PERSIST_ENTIRE_STORE: true,  // Use this only if you want to persist the entire store
  saveState: function (key, value, isInitialSet) {

    const doStateSaving = () => {
      try {
        const serializedState = JSON.stringify(value);
        window.localStorage.setItem(key, serializedState);
      } catch {
        // Ignore write errors
      }
    }

    if (isInitialSet) {
      // We don't debounce saving state since it's the initial set
      // so it's called only once and we need our storage to be updated
      // right away
      doStateSaving();
    }
    else {
      // Here we debounce saving state because it's the update and this function
      // is called every time the store state changes. However, it should not
      // be called too often because it triggers the expensive `JSON.stringify` operation.
      const DEBOUNCE_TIME = 1000 // In milliseconds
      // Debounce doStateSaving before calling it
      const processStateSaving = debounce(doStateSaving, DEBOUNCE_TIME);
      processStateSaving()  // save State
    }
  },
  loadState: function (key, noState) {
    try {
      const serializedState = window.localStorage.getItem(key);
      if (serializedState === null) {
        // No state saved
        return noState;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      // Failed to load state
      return undefined
    }
  },
  removeState: function (key) {
    window.localStorage.removeItem(key);
  },
  clear: function () {
    window.localStorage.clear();
  }
})
// ===================================================

store.setState("user", {}, {persist: true})
store.setState("pendingPayment", true)

store.setState("urlParam", '', {persist: true});
store.setState("passwordParam", '', {persist: true});

export default store;