const fs = require('fs');

class Telemetry {
  constructor() {
    this.samples = new Map(); 
  }

  // Makes a sample, puts it in a map,
  // and returns a token to reference it
  // in the future
  start() {
    const sample = new Sample();
    const token = this.samples.size + 1;
    this.samples.set(token, sample);
    sample.setStartTime();
    return token;
  }

  // Takes a token, records the end time
  // of the corresponding sample, and returns
  // the elapsed time.
  end(token) {
    if (!token) return -1;
    const sample = this.samples.get(token);
    sample.setEndTime();
    return sample.getElapsed();
  }

}

class Sample {
  constructor() {
    this.startTime = 0;
    this.endTime = 0;
  }

  setStartTime() {
    this.startTime = Date.now();
  }

  setEndTime() {
    this.endTime = Date.now();
  }

  getElapsed() {
    return this.endTime - this.startTime;
  }
}

module.exports = Telemetry;
