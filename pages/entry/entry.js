// pages/entry/entry.js

const auth = require('../../utils/auth.js');
Page({
  data: {
    hasMSTR: false,// 考研
    hasCET4: false,// 四级
    hasCET6: false,// 六级
    hasOTHER: false, // 其他
  },

  onLoad() {
    // 获取已验证的模块类型
    const verifyType = auth.getVerifyType() || '';
    verifyType.includes('MSTR') && this.setData({ hasMSTR: true });
    verifyType.includes('CET4') && this.setData({ hasCET4: true });
    verifyType.includes('CET6') && this.setData({ hasCET6: true });
    verifyType.includes('OTHER') && this.setData({ hasOTHER: true });
  },

  onModuleTap(e) {
    const module = e.currentTarget.dataset.module;

    if (auth.isVerified() && auth.getVerifyType()) {
      if (auth.getVerifyType().includes(module)) {
        // 存储选择的模块
        wx.switchTab({
          url: '/pages/page2/page2'
        });
      } else {
        // 所选模块与历史已选不一致
        wx.showModal({
          title: '提示',
          content: '所选模块与历史已选不一致，将前往验证页面重新验证',
          success: (res) => {
            if (res.confirm) {
              // 点击确定，跳转到 auth 页面
              wx.redirectTo({
                url: `/pages/auth/auth?module=${module}`
              });
            }
            // 点击取消，关闭弹窗（不做任何操作）
          }
        });
      }
    } else {
      // 验证不通过，跳转到 auth 页面
      wx.redirectTo({
        url: `/pages/auth/auth?module=${module}`
      });
    }
  }
});