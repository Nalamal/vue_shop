<template>
  <!-- 侧边栏菜单组件 -->
  <div>
    <el-aside :width="iscollapse ? '64px' : '200px'">
      <!-- 顶部控制按钮折叠区域 -->
      <div class="toggle-button" @click="toggleCollapse">|||</div>
      <!-- 菜单区域 -->
      <el-menu
        active-text-color="#409eff"
        text-color="#000"
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
              <component :is="iconlist[item.id!]"></component>
            </el-icon>
            <!-- 一级菜单文本区域 -->
            <span>{{ item.authName }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            :index="subItem.path"
            v-for="subItem in item.children"
            :key="subItem.id"
            @click="saveNavState(subItem.path!)"
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
  </div>
</template>

<script setup lang="ts">
import { ref, type DefineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import useMenuStore from '@/stores/menu'
import { Menu } from '@element-plus/icons-vue'
import { Avatar, Box, ShoppingBag, List, TrendCharts } from '@element-plus/icons-vue'

// 是否折叠
const iscollapse = ref(false)

// 点击按钮切换表单的折叠与展开
const toggleCollapse = () => {
  iscollapse.value = !iscollapse.value
}

// 从 menu 仓库中取出数据
const menu = useMenuStore()
// 通过解构赋值取出获取左侧菜单栏的方法
const { getMenulist } = menu
// 通过解构赋值取出左侧菜单栏的数据和字体图标
const { menulist } = storeToRefs(menu)

// 调用获取左侧菜单栏数据的方法
getMenulist()

// 定义 iconlist 的类型
interface IIconlist {
  [key: number]: DefineComponent
}

// 根据一级的菜单的 id 匹配对应的字体图标
const iconlist: IIconlist = {
  125: Avatar,
  103: Box,
  101: ShoppingBag,
  102: List,
  145: TrendCharts
}

// 激活的数据项
const activePath = ref<string | null>()

// 保存链接的激活状态
const saveNavState = (path: string) => {
  window.sessionStorage.setItem('activePath', path)
  activePath.value = path
}

// 激活的链接状态为会话存储的状态
activePath.value = window.sessionStorage.getItem('activePath')
</script>

<style lang="less" scoped>
.el-aside {
  color: #333744;
}
.toggle-button {
  font-size: 10px;
  color: #4a5064;
  // background-color: #f2f3f5;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu {
  border-right: none;
}
</style>
