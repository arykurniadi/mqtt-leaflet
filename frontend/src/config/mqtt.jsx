import { connect } from 'mqtt';

const url = "ws://localhost:9010";
const option = {
  keepalive: 60,
  clientId: "emqx_react_" + Math.random().toString(16).substring(2, 8),
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000, //ms
  connectTimeout: 30 * 1000, //ms
  username: 'user1',
  password: 'nusastyle17',
};

const client = connect(url, option);
client.on('connect', function () {});
  
export default client;