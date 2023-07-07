<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- logo 区域 -->
      <div>
        <img src="@/assets/img/logo.png" />
        <span>电商后台管理系统</span>
      </div>
      <!-- 登出按钮 -->
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧菜单区域 -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <!-- 顶部控制按钮折叠区域 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 菜单区域 -->
        <el-menu
          active-text-color="#409eff"
          background-color="#333744"
          text-color="#fff"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-sub-menu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template #title>
              <!-- 一级菜单图标 -->
              <el-icon>
                <component :is="iconlist[item.id]"></component>
              </el-icon>
              <!-- 一级菜单文本区域 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState(subItem.path)"
            >
              <!-- 二级菜单模板区域 -->
              <template #title>
                <!-- 二级菜单图标 -->
                <el-icon><Menu /></el-icon>
                <!-- 二级菜单文本区域 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 内容主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, type DefineComponent } from 'vue'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { Avatar, Box, Menu, List, ShoppingBag, TrendCharts } from '@element-plus/icons-vue'
import { selectMenus } from '@/service/modules/home'

// 退出功能
const logout = () => {
  // 清空 token
  window.sessionStorage.clear()
  // 跳转路由，返回登录页
  router.push('/login')
}

// 定义 menulist 的类型
interface IMenulist {
  id: number
  authName: string
  path: string
  children?: IMenulist[]
}

// 左侧菜单数据
let menulist = ref<IMenulist[]>([])

// 获取左侧菜单方法
const getMenulist = async () => {
  // 发送请求
  const { data: res } = await selectMenus()
  // 请求失败, 返回错误信息
  if (res.meta.status !== 200) {
    return ElMessage.error('获取左侧菜单失败！')
  }
  // 请求成功, 将请求结果储存在 menulist 中
  menulist.value = res.data
}

// 调用 getMenulist 方法, 获取左侧菜单
getMenulist()

// 定义 iconlist 的类型
interface IIconlist {
  [key: number]: DefineComponent
}

// 根据一级菜单的 id 值索引对应的小图标组件
const iconlist: IIconlist = {
  125: Avatar,
  103: Box,
  101: ShoppingBag,
  102: List,
  145: TrendCharts
}

// 是否折叠
let iscollapse = ref(false)

// 点击按钮切换表单的折叠与展开
const toggleCollapse = () => {
  iscollapse.value = !iscollapse.value
}

// 被激活的链接地址
let activePath = ref<string | null>('')

// 保存链接的激活状态
const saveNavState = (path: string) => {
  window.sessionStorage.setItem('activePath', path)
  activePath.value = path
}

// 激活的链接状态为会话存储的状态
activePath.value = window.sessionStorage.getItem('activePath')
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #fff;
  > div {
    display: flex;
    align-items: center;
    > img {
      width: 60px;
      height: 60px;
      border-radius: 30px;
    }
    > span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  color: #fff;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
