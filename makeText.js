/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function makeText(text) {
  let newWords = new markov.MarkovMachine(text);
  console.log(newWords.makeText());
}

function makeTextFromFile(path) {
  fs.readFile(path, 'utf8', function cb(err, data) {
    if (err) {
      console.error(`Error reading file: ${path} :${err}`);
      process.exit(1);
    } else {
      makeText(data);
    }
  });
}

async function makeTextFromUrl(url) {
  let response;

  try {
    response = await axios.get(url);
  } catch (err) {
    console.error(`Error fetching URL: ${url} :${err}`);
    process.exit(1);
  }
  makeText(response.data);
}

let [method, path] = process.argv.slice(2);

if (method === 'file') {
  makeTextFromFile(path);
} else if (method === 'url') {
  makeTextFromUrl(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
