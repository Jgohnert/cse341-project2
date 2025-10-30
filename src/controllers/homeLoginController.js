const homepageRoute = (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ?
    "D&D Magic Spells and Monster Weaknesses. Logged in" :
    "D&D Magic Spells and Monster Weaknesses. Logged out"
  );
};

module.exports = {
  homepageRoute
};