<template>
<div id="app">
<div>
    <v-toolbar>
      <v-toolbar-title>Title</v-toolbar-title>

      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn text>Link 1</v-btn>
        <v-btn text>Link 2</v-btn>
        <v-btn text>Link 3</v-btn>
      </v-toolbar-items>
<p class="text-right" style="position:absolute;right:150px;bottom:-15px">    
<v-form  v-on:submit="search">
    <v-container>
      <v-text-field v-model="word">
        <template v-slot:label>
          タグ検索 <v-icon style="vertical-align: middle"></v-icon>
        </template>
      </v-text-field>
    </v-container>
  </v-form>
</p>
<p class="text-right" style="position:absolute;right:20px;">
            <router-link to="/chat"  style="text-decoration:none;">
        <v-btn icon>
          <v-icon>mdi-newspaper</v-icon>
        </v-btn>
	  </router-link>
	    <router-link to="/edit"  style="text-decoration:none;">
        <v-btn icon>
          <v-icon>mdi-pencil-box-outline</v-icon>
        </v-btn>
	</router-link>
	</p>
    </v-toolbar>
  </div>
<router-view></router-view>
</div>
</template>

<script>
export default {
    data(){
      return {
        word : ""
      }
    },
    methods: {
      search(){
         //if you want to send any data into server before redirection then you can do it here
        this.$router.push({name:"chat",params:{word: this.word}});
      }
    }
  }
</script>
<style>
</style>
