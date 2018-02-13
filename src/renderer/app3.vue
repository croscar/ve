<template>
    <div id="app3" class="app3">
  <ol>
      {{ firstname }}
  </ol>

    </div>
</template>

<script>
export default {

  name: "ve",
  data() {
    return {
      firstname: "AAA",
      theme: this.$store.state.app.themeColor
    };
  },
  mounted() {
      this.firstname="eeeee"
      this.getdata()
  },
  beforeDestroy() {},
  methods: {

    updatedata:(thedata)=>{
      this.firstname="thedata"

    },

 
    
    getdata: () => {
      const Sequelize = require("sequelize");
      const sequelize = new Sequelize("mysql://root@localhost:3306/test");
      sequelize
        .authenticate()
        .then(() => {
          console.log("Connection has been established successfully.");
        })
        .catch(err => {
          console.error("Unable to connect to the database:", err);
        });

      const Njuser = sequelize.define("njuser", {
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        }
      });

      var aaa=this

      Njuser.sync({ force: false })
        .then(() => {
          // Table created
          return Njuser.create({
            firstName: "John",
            lastName: "Hancock"
          });
        })
        .then(() => {
          Njuser.findAll().then(njusers => {
            aaa.updatedata(njusers)
          });
        });
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  width: 100%;
  height: 100%;
}
</style>
