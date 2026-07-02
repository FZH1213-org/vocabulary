// utils/auth.js - 验证工具
const { VERIFY_STATUS } = require("../constant/verifyStatus");

/**
 * 检查是否已验证
 */
function isVerified() {
  return wx.getStorageSync('verifyStatus') === VERIFY_STATUS.VALID;
}
/**
 * 获取验证类型
 */
function getVerifyType() {
  return wx.getStorageSync('verifyType');
}

/**
 * 清除验证状态
 */
function clearVerify() {
  wx.removeStorageSync('verifyStatus');
  wx.removeStorageSync('verifyType');
}

/**
 * 需要验证的页面路径（tabBar 页面会自动处理）
 */
const protectedPages = [
  'pages/index/index',
  'pages/page2/page2'
];

/**
 * 检查页面是否需要验证
 */
function needsAuth(pagePath) {
  return protectedPages.some(p => pagePath.includes(p));
}

module.exports = {
  isVerified,
  getVerifyType,
  clearVerify,
  needsAuth,
  protectedPages
};