<template>
  <div>
    <div class="page-container">
      <section id="blog">
        <div class="filter-container">
          <el-select
            v-model="value"
            @change="filter()"
            :placeholder="value.name ? value.name : 'Filter'"
          >
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <ul class="blog-filter">
          <li
            class="list"
            :class="value === '' ? 'blog-filter-active' : ''"
            @click="filterAll"
          >
            All
          </li>
          <span class="filter-line"> /</span>

          <li v-show="value" class="blog-filter-active">{{ value.name }}</li>
        </ul>

        <div class="blog-container">
          <div v-for="item in data" href="#" class="blog-box" :key="item.id">
            <div class="blog-img">
              <img
                v-show="item.yoast_head_json.og_image[0].url"
                alt="#"
                class="blog-img"
                :src="item.yoast_head_json.og_image[0].url"
              />
            </div>
            <div class="blog-text">
              <span class="category">{{ item.category }}</span>
              <strong>{{ item.title.rendered }}</strong>
              <div class="blog-post-html" v-html="item.excerpt.rendered"></div>
              <router-link class="view-more" :to="`/post/${item.id}`">
                <el-button color="transparent" class="el-button-styled"
            >View more</el-button
          ></router-link
              >
            </div>
          </div>
        </div>
      </section>

      <el-pagination
        v-show="value === ''"
        v-model:currentPage="page"
        v-model:page-size="perPage"
        layout="prev, pager, next, sizes"
        :page-sizes="[5, 10, 20, 50]"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { ElPagination, ElSelect, ElOption } from "element-plus";

export default {
  data() {
    return {
      data: [],
      value: "",
      tags: [],
      currentFilter: "",
      page: 1,
      perPage: 20,
    };
  },
  methods: {
    fetchPost() {
      let url;
      this.value === ""
        ? (url = `posts?_embed=1&per_page=${this.perPage}&page=${this.page}`)
        : (url = "posts?tags=" + this.value.id);
      fetch("https://www.kiterocket.com/wp-json/wp/v2/" + url)
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
        });
    },
    fetchTags() {
      fetch("https://www.kiterocket.com/wp-json/wp/v2/tags").then((response) =>
        response.json().then((data) => {
          data.forEach((item) => {
            this.tags.push({ id: item.id, name: item.name });
          });
        })
      );
    },
    filter() {
      this.page = 1;
      this.perPage = 20;
      this.currentFilter = this.value;
      this.fetchPost();
    },
    handleSizeChange() {
      this.fetchPost();
    },
    handleCurrentChange() {
      this.fetchPost();
    },
    filterAll() {
      this.value = "";
      this.fetchPost();
    },
  },
  created() {
    this.fetchPost();
    this.fetchTags();
  },
  components: {
    ElPagination,
    ElSelect,
    ElOption,
  },
};
</script>

<style>
@import "../assets/styles/blog.css";
@import "../assets/styles/global.css";
</style>
