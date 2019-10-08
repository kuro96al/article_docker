<template>
<div id="edit">
    <form>
      <v-text-field
        v-model="title"
        label="タイトル"
        required
      ></v-text-field>
      <input-tag
        v-model="tags"
        label="タグ"
        required
      ></input-tag>
        <vue-editor v-model="text"
                    :disabled="!user.uid"
        />
      <v-btn  :disabled="!user.uid" class="mr-4" @click="doSend">submit</v-btn>
    </form>
  </div>
</template>

<script>
// firebase モジュール
import firebase from 'firebase'
// 改行を <br> タグに変換するモジュール
import InputTag from 'vue-input-tag'

export default {
  components: {InputTag },
  data() {
    return {
      user: {},  // ユーザー情報
      chat: [],  // 取得したメッセージを入れる配列
      title: '',  // 入力したメッセージ
      text: '',
      tags: []
    }
  },
created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
    })
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
    childAdded(snap) {
      const message = snap.val()
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      })
      this.scrollBottom()
    },
    doSend() {
	console.log(this.tags)
      if (this.user.uid && this.text.length) {
        // firebase にメッセージを追加
        firebase.firestore().collection('note').add({
          title: this.title,
          text: this.text,
          tags: this.tags,
          name: this.user.displayName,
	  image: this.user.photoURL
        }).then(ref => {
          this.title = '' // ...........................
          this.text = '' // ...........................
          this.tags = [] // ...........................
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
