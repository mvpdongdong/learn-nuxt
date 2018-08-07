<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        router>
        <el-menu-item index="/">最热</el-menu-item>
        <el-menu-item index="/new">最新</el-menu-item>
        <el-menu-item index="/tab/tech">技术</el-menu-item>
        <el-menu-item index="/tab/creative">创意</el-menu-item>
        <el-menu-item index="/tab/play">好玩</el-menu-item>
        <el-menu-item index="/tab/apple">Apple</el-menu-item>
        <el-menu-item index="/tab/jobs">酷工作</el-menu-item>
        <el-menu-item index="/tab/deals">交易</el-menu-item>
        <el-menu-item index="/tab/city">城市</el-menu-item>
        <el-menu-item index="/tab/qna">问与答</el-menu-item>
        <el-menu-item index="/tab/nodes">节点</el-menu-item>
        <el-menu-item index="/component">组件示例</el-menu-item>
        <div class="login" @click="goLogin" v-if="!isLogin">登录</div>
        <div class="user-info" v-else>
          {{userInfo}}<span class="logout" @click="goLogout">退出</span>
        </div>
      </el-menu>
    </el-header>
    <el-main>
      <nuxt keep-alive />
    </el-main>
    <!-- <el-footer>
      <span>
        Copyright © 2016-2018 Orange
      </span>
      <a class="github" href="https://github.com/OrangeXC/n2ex" target="_blank">
        <i class="muidocs-icon-custom-github"></i>
      </a>
    </el-footer> -->
    <back-top></back-top>
  </el-container>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import BackTop from '~/components/BackTop';

export default {
  data () {
    return {
      activeIndex: '/'
    };
  },
  computed: {
    ...mapState('user', [
      'userName',
      'userEmail',
      'isLogin'
    ]),
    ...mapGetters('user', [
      'userInfo'
    ])
  },
  created () {
    this.activeIndex = this.$route.path;
  },
  methods: {
    ...mapActions('user', [
      'logIn',
      'logOut'
    ]),
    goLogin () {
      this.logIn().then(() => {
        this.$message.success('登录成功！');
      });
    },
    goLogout () {
      this.logOut().then(() => {
        this.$message.success('退出成功！');
      });
    }
  },
  components: {
    BackTop
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  min-width: 960px;
}

.el-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #f7fbfd;
  line-height: 60px;
}

.github {
  height: 36px;
  font-size: 36px;
  color: #c8d6e8;

  line-height: 36px;

  &:hover {
    transform: scale(1.2);
    color: #8d99ab;
  }
}
.login, .user-info {
  float: right;
  margin-right: 20px;
  line-height: 60px;
  outline: none;
}
.login, .logout {
  cursor: pointer;
}
.logout {
  margin-left: 10px;
}
</style>
