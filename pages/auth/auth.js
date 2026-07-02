// pages/auth/auth.js

const { VERIFY_STATUS } = require("../../constant/verifyStatus");
const { md5 } = require("../../utils/md5");

Page({
  data: {
    inviteCode: '',
    errorMsg: '',
    loading: false,
    queryParams: {}
  },

  onLoad(options) {
    // 获取 url 带过来的参数
    this.setData({
      queryParams: options,
    });
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

    // 验证邀请码
    const { VERIFY_CODE } = require('../../constant/verifyCode');
    const keysArray = Object.keys(VERIFY_CODE);
    const type = code.slice(0, 4).toUpperCase();
    const verifyCode = (code.slice(4).toUpperCase());
    if (this.data.queryParams.module !== type) {
      this.setData({ errorMsg: '邀请码和所选模块不匹配' });
      return;
    }
    setTimeout(() => {
      if (verifyCode.length === 8 && keysArray.includes(type) && VERIFY_CODE[type].includes(md5(verifyCode))) {
        // 验证成功，存储标识
        wx.setStorageSync('verifyStatus', VERIFY_STATUS.VALID);
        wx.setStorageSync('verifyType', type);

        wx.showToast({
          title: '验证成功',
          icon: 'success',
          duration: 1500
        });

        setTimeout(() => {
          wx.switchTab({
            url: '/pages/page2/page2'
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
    wx.removeStorageSync('verifyStatus');
    wx.removeStorageSync('verifyType');
    wx.showToast({
      title: '已清除验证',
      icon: 'none'
    });
  }
});