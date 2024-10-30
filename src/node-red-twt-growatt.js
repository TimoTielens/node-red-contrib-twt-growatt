module.exports = function(RED) {
    const api = require('growatt')
    api.setDebugApi(false);
  
    async function pullData(node, config) {
      const growatt = new api({})
      
      let login;
      if(node.confignode.key !== undefined)
      {
        login = await growatt.sharePlantLogin(node.confignode.key).catch(e => {node.error(e)})
      }
      else if(node.confignode.username !== undefined && node.confignode.password !== undefined)
      {
        login = await growatt.login(node.confignode.username,node.confignode.password).catch(e => {node.error(e)})
      }
      else
      {
        login = await await growatt.demoLogin().catch(e => {node.error(e)})
      }

      if (login !== undefined) {
        let options = {
          plantData: config.optionplantdata,
          deviceData: config.optiondevicedata,
          weather: config.optionweather,
          totalData: config.optiontotaldata,
          statusData: config.optionstatusdata,
          deviceType: config.optiondevicetyp,
          historyLast: config.optionhistorylast,
          historyAll: config.optionhistoryall
        }
        if (config.optionplantid !== "") {
          options.plantId = config.optionplantid
        }
 
        let msg = {
            "_msgid": RED.util.generateId(),
            "payload": await growatt.getAllPlantData(options).catch(e => {node.error(e)})
        }
        node.send(msg);
        let logout = await growatt.logout().catch(e => {node.error(e)})
      }
    }
  
    function GrowattNode(config) {
      RED.nodes.createNode(this,config);
      const node = this;
  
      // Retrieve the config node
      node.confignode = RED.nodes.getNode(config.confignode);
      if (node.confignode == undefined) {
        node.log("No configuration found.");
      }
  
      // Act on incomming messages
      node.on('input', function(msg) {
        if (node.confignode != undefined) {
          pullData(node, config)
        }
      })
    }
  
    RED.nodes.registerType("growatt",GrowattNode);
  }