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
<p class="text-right" style="position:absolute;right:20px;">    
 <template v-if="$vuetify.breakpoint.smAndUp">
            <router-link to="/chat">
        <v-btn icon>
          <v-icon>mdi-newspaper</v-icon>
        </v-btn>
	  </router-link>
        <v-btn icon>
          <v-icon> mdi-magnify</v-icon>
        </v-btn>
	    <router-link to="/edit">
        <v-btn icon>
          <v-icon>mdi-pencil-box-outline</v-icon>
        </v-btn>
	</router-link>
      </template>
	</p>
    </v-toolbar>
  </div>
<router-view></router-view>
</div>
</template>
