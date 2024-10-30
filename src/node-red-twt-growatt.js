module.exports = function(RED) {
    const api = require('growatt')
    const growatt = new api({})
  
    async function Authenticate(node, config)
    {
      if (!growatt.isConnected()) 
      {
        if(node.confignode.key !== undefined)
        {
          await growatt.sharePlantLogin(node.confignode.key).catch(e => {node.error(e)})
        }
        else if(node.confignode.username !== undefined && node.confignode.password !== undefined)
        {
          await growatt.login(node.confignode.username,node.confignode.password).catch(e => {node.error(e)})
        }
        else
        {
          await await growatt.demoLogin().catch(e => {node.error(e)})
        }
      }
    }

    async function pullData(node, config) 
    {
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
          Authenticate(node, config)
          .then(pullData(node, config));       
        }
      })
    }
  
    function GetLoggers(config) {
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
          Authenticate(node, config)
          .then(async function() => 
            let msg = {
              "_msgid": RED.util.generateId(),
              "payload": await growatt.getDataLoggers().catch(e => {node.error(e)})
          }
          node.send(msg);
    
          
        }
      })
    }

    function ReadLoggerRegister(config) {
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
          Authenticate(node, config);
          pullData(node, config)
        }
      })
    }

    function WriteLoggerRegister(config) {
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
          Authenticate(node, config);
          pullData(node, config)
        }
      })
    }

    RED.nodes.registerType("Growatt get data",GrowattNode);
    RED.nodes.registerType("Growatt datalogger - Get loggers",GetLoggers);
    RED.nodes.registerType("Growatt datalogger - Register read",ReadLoggerRegister);
    RED.nodes.registerType("Growatt datalogger - Register write",WriteLoggerRegister);
  }