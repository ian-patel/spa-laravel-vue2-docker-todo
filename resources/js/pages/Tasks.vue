<template>
  <div>
    <h1>Tasks</h1>
    <!-- Pending Tasks  -->
    <el-row>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header">
            <new-task/>
          </div>
          <tasks-list :tasks="pendingTasks" v-if="pendingTasks.length"/>
          <div v-else>🤩 Don't be lazy, create task and do something.</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Completed tasks -->
    <el-row style="margin-top:30px;">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header">
            <h5>Completed tasks</h5>
          </div>
          <template v-if="completedTasks.length">
            <div
              v-for="task in completedTasks"
              :key="task.id"
              style="margin-bottom: 10px"
            >✅ {{ task.title }}</div>
          </template>
          <template v-else>🙃 You are lazy, you haven't completed any task yet.</template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    this.loadMore();
  },
  computed: {
    ...mapGetters(['tasks', 'completedTasks', 'pendingTasks'])
  },
  methods: {
    ...mapActions(['fetchTasks']),
    async loadMore() {
      await this.fetchTasks();
    }
  }
};
</script>

