export const correlationWeights = {
  // impact cross recommendation is high to place an emphasis on
  // having both impact and recommendation within one paragraph
  impactCrossRecommendation: 8,
  impactSynonymWordFreq: 0.5,
  impactWordFreq: 1,
  recommendationWordFreq: 1,
  recommendationSynonymWordFreq: 0.5,
};

export const cutOffs = {
  minimumWordDistance: 0.85,
  maintainScoreWithinPercent: 10,
};
