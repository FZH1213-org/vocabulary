// pages/page2/page2.js
const auth = require('../../utils/auth.js');

Page({
  data: {

  },

  onLoad(options) {
    // 检查验证状态
    if (!auth.isVerified()) {
      wx.redirectTo({
        url: '/pages/auth/auth'
      });
      return;
    }
  }
})