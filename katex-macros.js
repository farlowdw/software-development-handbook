const katexMacros = {
  mathNotation: {
    "\\R": "\\mathbb{R}",
    "\\C": "\\mathbb{C}",
    "\\N": "\\mathbb{N}",
    "\\W": "\\mathbb{W}",
    "\\Q": "\\mathbb{Q}",
    "\\Z": "\\mathbb{Z}",
    "\\U": "\\mathbb{U}",
    "\\F": "\\mathbb{F}",
    "\\pmi": "\\mathbb{PMI}",
    "\\wop": "\\mathbb{WOP}",
  },
  mathFunctions: {
    "\\len": "\\operatorname{len}{#1}",
    "\\dist": "\\operatorname{dist}{#1}",
    "\\im": "\\operatorname{Im}{#1}",
    "\\re": "\\operatorname{Re}{#1}",
    "\\rel": "\\operatorname{\\mathsf{R}}_{\\operatorname{\\mathsf{#1}}}",
    "\\Rel": "\\operatorname{\\mathsf{#1}}",
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

export default allMacros;
