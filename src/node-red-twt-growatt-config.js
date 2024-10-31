module.exports = function(RED) {

  function ConfigNode(n) {
    RED.nodes.createNode(this, n);
    this.name = n.name;
    this.username = this.credentials.username;
    this.password = this.credentials.password;
    this.token = this.credentials.token;
  }

  RED.nodes.registerType("growatt-config", ConfigNode, {
    credentials: {
      username: {type:"text"},
      password: {type:"password"},
      token: {type:"password"}
    }
  });
}