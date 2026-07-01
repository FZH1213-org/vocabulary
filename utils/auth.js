// utils/auth.js - 验证工具

/**
 * 检查是否已验证
 */
function isVerified() {
  return wx.getStorageSync('isVerified') === true;
}

/**
 * 获取验证时间
 */
function getVerifyTime() {
  return wx.getStorageSync('verifyTime');
}

/**
 * 清除验证状态
 */
function clearVerify() {
  wx.removeStorageSync('isVerified');
  wx.removeStorageSync('verifyTime');
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
  getVerifyTime,
  clearVerify,
  needsAuth,
  protectedPages
};