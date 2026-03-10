const startTime = Date.now();

const isTimeExpired = () => {
  const currentTime = Date.now();
  const diff = (currentTime - startTime) / 1000 / 60;

  return diff > 20;
};

module.exports = isTimeExpired;
