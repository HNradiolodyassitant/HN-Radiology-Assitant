window.HN_REGISTRY = {
  findings: {},

  registerFinding: function(plugin) {
    if (!plugin || !plugin.key) {
      console.error("Invalid finding plugin:", plugin);
      return;
    }

    this.findings[plugin.key] = plugin;
    console.log("Finding registered:", plugin.title);
  },

  getFinding: function(key) {
    return this.findings[key];
  },

  getAllFindings: function() {
    return Object.values(this.findings);
  }
};
