<template>
<div>
    <el-container>
        <el-menu  router  class="el-menu-vertical-demo" background-color="#545c64"
                text-color="#fff" active-text-color="#ffd04b">
    			<!-- for循环菜单组件，传入每一个菜单项-->
                <asideMenu v-for="(menu,index) in menuList" :menu="menu" :key="index"/>
        </el-menu>

        <el-container>
            <el-header>
                <div class="left">
                     <Breadcrumb/>
                </div>
     			<!--//右侧用户名-->
                <div class="right">
                    <el-dropdown @command="doCommand">
                        <span class="el-dropdown-link"> {{userName}} </span>
                        <el-dropdown-menu slot="dropdown">
                            <!--点击时触发doCommand方法并传入logout-->
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

            </el-header>
            <!-- 组件渲染区域 -->
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb.vue"
    import {logout} from "@/apis/user"
    import asideMenu from "@/components/asideMenu.vue"
    export default {
        name:'Layout',
        components:{
            Breadcrumb,
            asideMenu
        },
        methods:{
          async  doCommand(e){
            if(e==="logout"){
                //logout接口，成功返回code为20000
                let res = await logout()
                if(res.data.code === 20000){                   
                    //如果成功跳转到login页面
                    this.$router.replace("/login")
                    //退出成功时清掉所有的存储信息
                    localStorage.clear()
                    //跳转后刷新下页面，清除掉路由信息
                    window.location.reload()
                }
            }
        }  
        },
        computed:{
            userName(){
                return this.$store.state.userName
            },
            menuList(){
                return this.$store.state.menuList
            }
        },
    }
</script>

<style lang="scss" scoped>
a:link {
  text-decoration: none;
  color: #fff;
}
/* 状态二: 已经访问过的链接 */
a:visited {
  text-decoration: none;
  color: #fff;
}
/* 状态三: 鼠标划过(停留)的链接(默认红色) */
a:hover {
  text-decoration: none;
  color: #fff;
}
/* 状态四: 被点击的链接 */
a:active {
  text-decoration: none;
  color: #fff;
}
.el-header {
    display: flex;
    align-items: center;
    color: black;
    justify-content: space-between;
}
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
}

.el-container {
    height: 100vh;
}
.el-menu-vertical-demo {
    border:none;
}
</style>