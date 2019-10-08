<template>
<div id="article">
      <div v-if="user.uid" key="login">
        [{{ user.displayName }}]
        <button type="button" @click="doLogout">ログアウト</button>
      </div>
      <!-- 未ログイン時にはログインボタンを表示 -->
      <div v-else key="logout">
        <button type="button" @click="doLogin">ログイン</button>
      </div>
    <!--　Firebase から取得したリストを描画（トランジション付き）　-->

      <section v-for="{ key, name, image, title, text, tags, summary } in article" :key="key" class="item">
	 <v-card
    max-width="344"
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar color="grey"><img :src="image"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{title}}</v-list-item-title>
        <v-list-item-subtitle>by {{name}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text> {{summary}}</v-card-text> 
       <v-chip v-for="tag in tags">{{tag}}</v-chip>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Read
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Bookmark
      </v-btn>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
    </section>
  </div>
</template>

<script>
// firebase モジュール
import firebase from 'firebase'
// 改行を <br> タグに変換するモジュール
import Nl2br from 'vue-nl2br'
export default {
  components: { Nl2br },
  data() {
    return {
      user: {},  // ユーザー情報
      article: [],  // 取得したメッセージを入れる配列
      text: '',
    }
  },

mounted() {
console.log(this.$route)
const ref_message = firebase.firestore().collection('note').where("tags","array-contains",this.$route.params.word).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    this.loading=true;
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
	const article = doc.data();
      this.article.push({
        name: article.name,
        image: article.image,
        title: article.title,
        text: article.text,
        tags: article.tags,
        summary: article.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').slice(0,20)
      })
	});
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
},
  methods: {
    // ログイン処理
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut()
    },
    // スクロール位置を一番下に移動
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight)
      })
    },
    // 受け取ったメッセージをchatに追加
    // データベースに新しい要素が追加されると随時呼び出される
    childAdded(article) {
	console.log(article)
      this.article.push({
        name: article.name,
        image: article.image,
        title: article.title,
	text: article.text,
	tags: article.tags,
	summary: article.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').slice(0,20)
      })
      this.scrollBottom()
    },
    doSend() {
      if (this.user.uid && this.input.length) {
        // firebase にメッセージを追加
        firebase.database().ref('message').push({
          message: this.input,
          name: this.user.displayName,
          image: this.user.photoURL
        }, () => {
          this.input = '' // フォームを空にする
        })
      }
    }
  }
}
</script>
<style>
* {
  margin: 0;
  box-sizing: border-box;
}
.header {
  background: #3ab383;
  margin-bottom: 1em;
  padding: 0.4em 0.8em;
  color: #fff;
}
.content {
  margin: 0 auto;
  padding: 0 10px;
  max-width: 600px;
}
.form {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  height: 80px;
  width: 100%;
  background: #f5f5f5;
}
.form textarea {
  border: 1px solid #ccc;
  border-radius: 2px;
  height: 4em;
  width: calc(100% - 6em);
  resize: none;
}
.list {
  margin-bottom: 100px;
}
.item {
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.8em;
}
.item-image img {
  border-radius: 20px;
  vertical-align: top;
}
.item-detail {
  margin: 0 0 0 1.4em;
}
.item-name {
  font-size: 75%;
}
.item-message {
  position: relative;
  display: inline-block;
  padding: 0.8em;
  background: #deefe8;
  border-radius: 4px;
  line-height: 1.2em;
}
.item-message::before {
  position: absolute;
  content: " ";
  display: block;
  left: -16px;
  bottom: 12px;
  border: 4px solid transparent;
  border-right: 12px solid #deefe8;
}
.send-button {
  height: 4em;
}
/* トランジション用スタイル */
.chat-enter-active {
  transition: all 1s;
}
.chat-enter {
  opacity: 0;
  transform: translateX(-1em);
}
</style>
