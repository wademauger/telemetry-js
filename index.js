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
    const sample = this.samples.get(token);
    sample.setEndTime();
    return sample.getElapsed();
  }

  // Prints the name and elapsed time associated with
  // a token (if it exists)
  print(success, token, algorithmName, sampleSize) {
    const sample = this.samples.get(token);
    if (!success) {
      console.log(`${algorithmName} failed after ${sample.getElapsed()}ms`); 
      return;
    }
    if (sample) {
      console.log(`${algorithmName} sorted ${sampleSize} items in ${sample.getElapsed()}ms`);
    }
  }

  // Writes the same information as the print function,
  // but as a csv file
  printCsv(success, token, algorithmName, sampleSize) {
    const sample = this.samples.get(token);
    if (success) {
      console.log(`"${algorithmName}", ${sampleSize}, ${sample.getElapsed()}`);
    } else {
      console.log(`"${algorithmName}", ${sampleSize}, "FAILED"`);
    }
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
