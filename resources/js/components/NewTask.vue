<template>
  <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent="submit" :inline="true">
    <el-form-item style="margin-bottom: 0px;">
      <div>
        <el-form-item prop="title">
          <el-input placeholder="title" v-model="form.title"></el-input>
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item style="margin-bottom: 0px;">
      <el-button native-type="submit" type="primary">Add</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        title: null
      },
      rules: {
        title: [
          {
            required: true
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(['addTask']),
    async submit() {
      if (await this.$refs.form.validate()) {
        await this.addTask({ ...this.form });
      }
    }
  }
};
</script>