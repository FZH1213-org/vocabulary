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
    const targetUrl = encodeURIComponent('https://cdn.jmj1995.com/frent_20260705_mini_词汇复习表格·复习版（目录+发音）.html');
    wx.navigateTo({
      url: `/pages/webview/webview?url=${targetUrl}&title=看故事`
    });
  },

  // 看故事
  onViewStory() {
    const targetUrl = encodeURIComponent('https://cdn.jmj1995.com/frent_20260705_mini_马里亚纳海沟的秘密·复习版.html');
    wx.navigateTo({
      url: `/pages/webview/webview?url=${targetUrl}&title=看故事`
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