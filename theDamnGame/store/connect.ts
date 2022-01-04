function compare(a, b) {
  return a === b;
}

function connect(store, mapStateToValue) {
  let currentValue = mapStateToValue(store.getState());
  return (fn) =>
    store.subscribe(() => {
      const newValue = mapStateToValue(store.getState());
      if (!compare(currentValue, newValue)) {
        const oldValue = currentValue;
        currentValue = newValue;
        fn(newValue, oldValue);
      }
    });
}

export default connect;
