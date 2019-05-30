<template>
  <div class="register">
    <el-card class="register__card" :body-style="{ padding: '40px' }">
      <h1 class="register__title mb-4">Register</h1>
      <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent="submit">
        <el-form-item>
          <div class="register__name-item">
            <el-form-item class="register__name" prop="name">
              <el-input placeholder="name" v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="register__email-item">
            <el-form-item class="register__email" prop="email">
              <el-input placeholder="email" v-model="form.email"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="Password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" class="register__btn-submit" type="primary">Register</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/login">Already have account?</router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      rules: {
        name: [
          { required: true, message: 'Please enter name', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: 'Please enter email',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    isLoggedIn(val) {
      if (val) this.redirectIfLogined();
    }
  },
  computed: mapGetters(['isLoggedIn']),
  methods: {
    ...mapActions(['register']),
    async submit() {
      if (await this.$refs.form.validate()) {
        await this.register({ ...this.form });
        this.redirectIfLogined();
      }
    },
    redirectIfLogined() {
      if (this.isLoggedIn) this.$router.push(this.$route.query.r || '/');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/_helpers';

.register {
  &__card {
    width: 450px;
    margin: 20vh auto 0;
  }

  &__title {
    font-size: 36px;
    text-align: center;
    color: $--color-primary;
  }

  &__email-item {
    display: flex;
  }

  &__email,
  &__name {
    flex-grow: 1;
  }

  &__btn-submit {
    width: 100%;
  }
}
</style>
