// app.js
App({
  onLaunch() {
    console.log('词汇复习小程序启动');
    this.checkAuth();
  },

  onShow() {
    // 每次显示时也检查验证状态
    this.checkAuth();
  },

  // 检查验证状态
  checkAuth() {
    const isVerified = wx.getStorageSync('isVerified');

    if (!isVerified) {
      // 未验证，跳转到验证页面
      wx.redirectTo({
        url: '/pages/auth/auth',
        fail: () => {
          // redirectTo 失败时尝试 reLaunch
          wx.reLaunch({
            url: '/pages/auth/auth'
          });
        }
      });
    }
  },

  globalData: {
    userInfo: null
  }
});