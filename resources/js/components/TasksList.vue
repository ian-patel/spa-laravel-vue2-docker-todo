<template>
  <ul style="list-style: none;padding:0px;">
    <template v-for="task in tasks">
      <li :key="task.id">
        <input type="checkbox" v-model="task.completed" class="toggle" @change="complete(task.id)">
        {{ task.title}}
      </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(['completeTask']),
    complete(id) {
      const task = this.getTask(id);
      this.completeTask({
        id: id
      });
    },
    getTask(id) {
      return _.find(this.tasks, ['id', id]);
    }
  }
};
</script>