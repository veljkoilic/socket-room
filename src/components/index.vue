<template>
  <div class="echo">
        <h2>Messages:</h2>
        <p v-if="socketConnection">{{connected}}</p>
        
        <p v-for="msg in messages" :key="msg.id">
          {{ msg }}
        </p>

        <p v-if="socketConnection">
          {{disconnected}}
        </p>

      <form action="#" method="post" @submit.prevent="connect">
        <input type="text" v-model="newMsg" autofocus placeholder="Send a message">
        <button>SEND</button>
      </form>

        <button @click="connect">Connect</button>
        <button @click="disconnect">Disconnect</button>

  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      newMsg: "",
      messages: [],
      socket: io("localhost:3000"),
      connected: "",
      disconnected: "",
      socketConnection: false
    };
  },
  methods: {
    connect() {
      this.socket.emit("sendMessage", this.newMsg);
    },
    disconnect(data) {
      this.socket.emit("disconnect", {
        customEvent: "Disconnected from server"
      });
    }
  },
  mounted() {
    this.socket.on("click", data => {
      this.messages.push(data.msgs);
      this.connected = data.connected;
      (this.newMsg = ""), (this.socketConnection = true);
    });

    this.socket.on("function", data => {
      this.socketConnection = true;
      this.disconnect = data.msg;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echo {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #6ABEA7;
  width:700px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

}
h2{
  color: #7CFFC4;
  margin: 0;
  padding: 20px 0;
}

.echo > p{
  color:white;
  font-weight: bold;
}
form>input{
  width:250px;
  margin:0 auto;
  padding: 8px 10px;
  margin-bottom:30px;
  border-radius:20px;
  border:none;
}
form>button{
  color:black;
  border:none;
  border-radius: 3px;
  margin-left: 10px;
  margin-right: 0;
  background-color: white;
    color:#6ABEA7;
  background-color: #BDFFFD;
}
button{
  border:none;
  color:#6ABEA7;
  background-color: #BDFFFD;
  font-weight: 700;
  padding:8px 15px;
  border-radius: 8px;
  margin: 0px 20px 30px 20px
}
</style>
