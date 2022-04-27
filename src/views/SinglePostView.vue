<template>
  <div
    :style="
      post.yoast_head_json.og_image[0].url
        ? `

    height: 100vh;
    position: absolute;
    background-position: center;
    background-size: cover;
    overfow-x: hidden;
    background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('${post.yoast_head_json.og_image[0].url}')`
        : ''
    "
  >
    <div class="banner-title">
      <div class="breadcrum">
        <ul class="blog-filter">
          <li class="list go-back"><router-link to="/">Blog </router-link></li>
          <li>/</li>
          <li class="user-select">
            <strong v-show="post.title.rendered">
              {{ post.title.rendered }}
            </strong>
          </li>
        </ul>
      </div>
      <h1 v-show="post.title.rendered">{{ post.title.rendered }}</h1>
      <div class="p-container">
        <p v-show="post.excerpt.rendered" v-html="post.excerpt.rendered"></p>
        <a :href="post.link" target="blank">
          <el-button color="transparent" class="view-more-btn"
            >View more</el-button
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    fetchPost() {
      const id = this.$route.params.id;
      fetch(`https://www.kiterocket.com/wp-json/wp/v2/posts/${id}`).then(
        (response) =>
          response.json().then((data) => {
            this.post = data;
          })
      );
    },
  },
};
</script>

<style>
@import "../assets/styles/blog.css";
@import "../assets/styles/post.css";
@import "../assets/styles/global.css";
</style>
