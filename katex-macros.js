const katexMacros = {
  sampleCommands: {
    "\\x": "x+1",
  },
  mathFunctions: {
    "\\len": "\\operatorname{len}{#1}",
    "\\dist": "\\operatorname{dist}{#1}",
  },
  complexityPerformance: {
    "\\perfVeryGood": "\\colorbox{darkgreen}{$#1(#2)$}",
    "\\perfGood": "\\colorbox{darkolivegreen}{$#1(#2)$}",
    "\\perfAverage": "\\colorbox{b3a800}{$#1(#2)$}",
    "\\perfBad": "\\colorbox{b36200}{$#1(#2)$}",
    "\\perfVeryBad": "\\colorbox{darkred}{$#1(#2)$}",
    "\\perfCustom": "\\colorbox{#3}{$#1(#2)$}",
    "\\perfNeutral": "\\colorbox{gray}{$#1(#2)$}",
  }
}

let allMacros = {};
for (const macrosCategory in katexMacros) {
  Object.assign(allMacros, katexMacros[macrosCategory])
}

module.exports = allMacros;
