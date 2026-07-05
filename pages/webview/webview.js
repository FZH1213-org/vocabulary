// pages/webview/webview.js
Page({
  data: {
    url: '',
    title: '加载中'
  },

  onLoad(options) {
    // 从参数获取 URL 和标题
    const url = options.url || '';
    const title = options.title || '页面';

    // URL 编码处理
    const decodedUrl = decodeURIComponent(url);

    this.setData({
      url: decodedUrl,
      title: title
    });

    // 动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: title
    });
  },

  // web-view 消息回调
  onMessage(e) {
    console.log('webview message:', e.detail);
  },

  // web-view 加载完成回调
  onLoadSuccess(e) {
    console.log('webview loaded:', e.detail);
  },

  // web-view 加载失败回调
  onLoadError(e) {
    console.error('webview error:', e.detail);
    wx.showToast({
      title: '页面加载失败',
      icon: 'error'
    });
  }
});