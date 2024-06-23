<template>
  <div class="edit-column-article">
    <el-form :model="form"
             ref="form">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload class="cover-uploader"
                   :http-request="uploadCover"
                   :show-file-list="false">
          <img v-if="form.cover"
               :src="form.cover"
               class="avatar" />
          <el-icon v-else
                   class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tag"
                   multiple
                   placeholder="请选择">
          <el-option v-for="item in tagOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    文章内容：
    <my-editor ref="editor"></my-editor>
    <div class="button-group">
      <el-button type="primary"
                 @click="handleSubmit"
                 class="submit-button">提交</el-button>
      <el-button type="plain"
                 @click="handleBack"
                 class="submit-button">返回</el-button>
    </div>
  </div>
</template>

<script>
import MyEditor from '../../components/MyEditor.vue'
export default {
  components: { MyEditor },
  name: 'ColumnPage',
  data() {
    return {
      title: '',
      form: {
        title: '',
        cover: '',
        content: '',
        tag: [],
      },
      tagOptions: [
        {
          value: '剪纸',
          label: '剪纸',
        },
        {
          value: '学习',
          label: '学习',
        },
        {
          value: '学习剪纸',
          label: '学习剪纸',
        },
      ],
    }
  },
  methods: {
    uploadCover(e) {
      this.$uploadImg(e.file).then((res) => {
        ElMessage({
          message: '上传成功',
          type: 'success',
        })
        this.form.cover = res
        console.log(this.form.cover)
      })
    },
    handleSubmit() {
      let url = '/api/article/addArticle'
      let params = new URLSearchParams()
      params.append('content', this.$refs.editor.getHtml())
      params.append('coverImage', this.form.cover)
      params.append('title', this.form.title)
      params.append('userId', this.$global.userId)
      params.append('columnId', this.$route.params.id)
      this.$http.post(url, params).then((res) => {
        ElMessage({
          message: '提交成功',
          type: 'success',
        })
        this.$router.back()
      })
    },
    handleBack() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.edit-column-article {
  width: 1000px;
  margin: 50px auto;
  font-family: sans-serif;
}

.edit-column-article:deep(.w-e-text-container) {
  font-family: sans-serif;
}

.cover-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.cover-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  display: block;
}

.button-group {
  display: flex;
  justify-content: space-around;
}

.submit-button {
  margin-top: 20px;
  width: 300px;
  height: 40px;
}
</style>