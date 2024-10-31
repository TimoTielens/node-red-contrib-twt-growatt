module.exports = function(RED) {
    const api = require('growatt')
    const growatt = new api({})
  
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
          Authenticate(node)
          .then(pullData(node, config));       
        }
      })
    }
  
    function GetLoggers(config) {
      RED.nodes.createNode(this, config);
      const node = this;
  
      node.confignode = RED.nodes.getNode(config.confignode);
      if (node.confignode == undefined) {
        node.log("No configuration found.");
      }
  
      node.on('input', function(msg) {
        if (node.confignode != undefined) {
          Authenticate(node)
          .then(PerformgetDataLoggers(node));
        }
        else {
          node.log("No configuration found.");
        }
      })
    }

    function ReadLoggerRegister(config) {
      RED.nodes.createNode(this, config);
      const node = this;
  
      node.confignode = RED.nodes.getNode(config.confignode);
      if (node.confignode == undefined) {
        node.log("No configuration found.");
      }
  
      node.on('input', function(msg) {
        if (node.confignode != undefined) {
          Authenticate(node)
          .then(PerformGetDataLoggerRegister(node, msg.payload));
        }
        else {
          node.log("No configuration found.");
        }
      })
    }

    function WriteLoggerRegister(config) {
      RED.nodes.createNode(this, config);
      const node = this;
  
      node.confignode = RED.nodes.getNode(config.confignode);
      if (node.confignode == undefined) {
        node.log("No configuration found.");
      }
  
      node.on('input', function(msg) {
        if (node.confignode != undefined) {
          Authenticate(node)
          .then(PerformGetDataLoggerRegister(node, msg.payload));
        }
        else {
          node.log("No configuration found.");
        }
      })
    }

    function Logout(config) {
      RED.nodes.createNode(this, config);
      const node = this;
  
      node.confignode = RED.nodes.getNode(config.confignode);
      if (node.confignode == undefined) {
        node.log("No configuration found.");
      }
  
      node.on('input', function(msg) {
        if (node.confignode != undefined) {
          Authenticate(node)
          .then(PerfromLogout(node));
        }
        else {
          node.log("No configuration found.");
        }
      })
    }

    async function Authenticate(node)
    {
      if (!growatt.isConnected()) 
      {
        if(node.confignode.token !== undefined)
        {
          await growatt.sharePlantLogin(node.confignode.token).catch(e => {node.error(e)})
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

    async function PerfromLogout(node) 
    {
      node.send(
        CreateMessage(
          await growatt.logout().catch(e => {node.error(e)})));
    }

    async function PerformgetDataLoggers(node) 
    {
      node.send(
        CreateMessage(
          await growatt.getDataLoggers().catch(e => {node.error(e)})));
    }

    async function PerformGetDataLoggerRegister(node, input) 
    {
      node.send(
        CreateMessage(
          await growatt.getDataLoggerRegister(input.serialNumber, input.address).catch(e => {node.error(e)})));
    }

    async function PerformSetDataLoggerRegister(node, input) 
    {
      node.send(
        CreateMessage(
          await growatt.setDataLoggerRegister(input.serialNumber, input.address, input.value).catch(e => {node.error(e)})));
    }

    function CreateMessage(input){
      return {
        "_msgid": RED.util.generateId(),
        "payload": input
      }
    }

    RED.nodes.registerType("Growatt get data", GrowattNode);
    RED.nodes.registerType("Growatt datalogger - Get loggers", GetLoggers);
    RED.nodes.registerType("Growatt datalogger - Register read", ReadLoggerRegister);
    RED.nodes.registerType("Growatt datalogger - Register write", WriteLoggerRegister);
    RED.nodes.registerType("Growatt logout", Logout);
  }