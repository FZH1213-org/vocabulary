// pages/home/home.js
const auth = require('../../utils/auth.js');

Page({
  data: {
    currentModule: '',
    modules: {
      'MSTR': '考研词汇',
      'CET4': '四级词汇',
      'CET6': '六级词汇',
      'OTHER': '其他词汇'
    }
  },

  onLoad(options) {
    // 检查验证状态
    if (!auth.isVerified()) {
      wx.redirectTo({
        url: '/pages/auth/auth'
      });
      return;
    }

    // 获取当前选择的模块
    const currentType = wx.getStorageSync('currentType') || '';
    this.setData({
      currentModule: this.data.modules[currentType] || '未选择模块'
    });
  },

  // 学单词
  onLearnWords() {
    wx.navigateTo({
      url: '/pages/learn/learn'
    });
  },

  // 看故事
  onViewStory() {
    wx.navigateTo({
      url: '/pages/story/story'
    });
  },

  // 看翻译
  onViewTranslate() {
    wx.navigateTo({
      url: '/pages/translate/translate'
    });
  },

  // 强记忆
  onMemoryBoost() {
    wx.navigateTo({
      url: '/pages/memory/memory'
    });
  }
});