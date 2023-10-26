const { useFetcher } = require("../services/useFetcher");

const combinedRemedies = async (req, res) => {
  const bodyData = req.body;
  const p1 = await useFetcher("/basic_gem_suggestion", bodyData);
  const p2 = await useFetcher("/rudraksha_suggestion", bodyData);
  var data = {};
  if (p1.status === 200 && p1.res) {
    data.gemSuggestion = p1.res;
  }
  if (p2.status === 200 && p2.res) {
    data.rudraksh = p2.res;
  }

  res.status(200).json({ state: true, res: data });
};
const combinedReportDosha = async (req, res) => {
  const bodyData = req.body;
  const p1 = await useFetcher("/kalsarpa_details", bodyData);
  const p2 = await useFetcher("/sadhesati_current_status", bodyData);
  const p3 = await useFetcher("/sadhesati_life_details", bodyData);
  const p5 = await useFetcher("/manglik", bodyData);
  const p4 = {};
  var data = {};
  if (p1.status === 200 && p1.res) {
    data.kalpsarpa = p1.res;
  }
  if (p2.status === 200 && p2.res) {
    p4.current = p2.res;
  }
  if (p3.status === 200 && p3.res) {
    p4.timeline = p3.res;
  }
  if (p5.status === 200 && p5.res) {
    data.manglik = p5.res;
  }
  data.sadesati = p4;
  res.status(200).json({ state: true, res: data });
};

module.exports = {
  combinedRemedies,
  combinedReportDosha,
};
