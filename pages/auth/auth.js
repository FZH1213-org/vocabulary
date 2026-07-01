// pages/auth/auth.js

Page({
  data: {
    inviteCode: '',
    errorMsg: '',
    loading: false
  },

  onLoad() {
    // 检查是否已验证
    const isVerified = wx.getStorageSync('isVerified');
    if (isVerified) {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },

  onInput(e) {
    this.setData({
      inviteCode: e.detail.value,
      errorMsg: ''
    });
  },

  onSubmit() {
    const code = this.data.inviteCode.trim();

    if (!code) {
      this.setData({ errorMsg: '请输入邀请码' });
      return;
    }

    this.setData({ loading: true, errorMsg: '' });

    // 验证邀请码（可配置多个有效邀请码）
    const validCodes = ['VIP2024', 'LETSGO', 'ENGLISH123'];

    setTimeout(() => {
      if (validCodes.includes(code.toUpperCase())) {
        // 验证成功，存储标识
        wx.setStorageSync('isVerified', true);
        wx.setStorageSync('verifyTime', Date.now());

        wx.showToast({
          title: '验证成功',
          icon: 'success',
          duration: 1500
        });

        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      } else {
        this.setData({
          errorMsg: '邀请码无效，请检查后重试',
          loading: false
        });
      }
    }, 500);
  },

  // 清除验证状态（开发调试用）
  clearVerify() {
    wx.removeStorageSync('isVerified');
    wx.removeStorageSync('verifyTime');
    wx.removeStorageSync('inviteCode');
    wx.showToast({
      title: '已清除验证',
      icon: 'none'
    });
  }
});