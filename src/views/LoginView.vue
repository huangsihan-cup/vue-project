<template>
    <div class="login-box">
      <div class="login-input-box center">
        <h1>信贷管理系统</h1>
        <el-form :model="ruleForm" 
        :rules="rules" 
        status-icon 
        ref="ruleForm" 
        class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input prefix-icon="el-icon-s-order" type="password" v-model="ruleForm.pass"  autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form>
      </div>
    </div>
</template>

<script>
    import { doLogin } from "@/apis/user"
    export default {
        name:'LoginView',
        data(){
          return{
            ruleForm: {
                username: "admin",
                pass: "approve123456."
            },
            rules: {
                    username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
                    pass: [{validator: this.validatePass, trigger: "blur"}], 
                  }
          }
        },
        methods:{
          validatePass(rule, value, callback) {
                if (value === "") {
                  callback(new Error("请输入密码"));
                } else if (value.length < 6) {
                  callback(new Error("密码不能小于6位数"));
                } else {
                  callback();
                }
              },
          submitForm(){
          this.$refs.ruleForm.validate(valid => {
                if (valid) {
                //验证通过,调用login方法，传入登录信息
                this.login(this.ruleForm)
                } else {
                  return false;
                }
              });
          },
          async login(form){
            const res = await doLogin(form)
            if (res.data.code === 20000) {
                  this.$message.success('登录成功'); 
                  if (res?.data?.data?.token) {
                      localStorage.setItem('token',res?.data?.data?.token)
                      //在这里成功后执行这个方法，await确保成功到菜单和路由
                      await this.$store.dispatch('getMenuList')
                      this.$store.commit("NAMEUPDATE",this.ruleForm.username)
                      this.$router.push("/home");                     
                  }               
                } else {
                  this.$message.error('登录失败!!!');
                }
          },
        }
    }
</script>

<style lang="scss" scoped>
.login-input-box {
  width: 500px;
  height: 320px;
  background: #fff;
  text-align: center;
  opacity: 0.8;    
  padding: 40px 40px 12px 12px;
  border-radius: 15px;
}

.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(../assets/bg2.jpg);
  background-size: cover;
}

.el-button {
  width: 200px;
}

.el-input {
  width: 400px;
  margin-bottom: 16px;
}

::v-deep .el-input__inner {
  background: #e5e5e5;
}
</style>