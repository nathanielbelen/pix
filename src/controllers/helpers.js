function delay(t, v) {
  return new Promise(resolve => setTimeout(resolve, t, v));
}

exports.delay = delay;