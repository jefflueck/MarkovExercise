/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== '');
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chain = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chain.has(word)) {
        chain.get(word).push(nextWord);
      } else {
        chain.set(word, [nextWord]);
      }
      this.chain = chain;
    }
  }

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chain.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chain.get(key));
    }
    return out.join(' ');
  }
}

module.exports = { MarkovMachine };
