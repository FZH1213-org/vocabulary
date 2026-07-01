// pages/index/index.js
const vocabularyData = require('../../utils/vocabulary.js').vocabularyData;
const auth = require('../../utils/auth.js');

// 音频上下文
let audioContext = null;

Page({
  data: {
    title: '',
    subtitle: '',
    total: 0,
    sections: [],
    vocabulary: [],
    currentSection: 0,
    inputValues: {},
    checkResults: {},
    score: {
      done: 0,
      correct: 0,
      rate: 0
    },
    scrollIntoView: ''
  },

  onLoad() {
    // 检查验证状态
    if (!auth.isVerified()) {
      wx.redirectTo({
        url: '/pages/auth/auth'
      });
      return;
    }

    // 初始化数据
    this.setData({
      title: vocabularyData.title,
      subtitle: vocabularyData.subtitle,
      total: vocabularyData.total,
      sections: vocabularyData.sections,
      vocabulary: vocabularyData.vocabulary
    });

    // 初始化音频
    audioContext = wx.createInnerAudioContext();
  },

  onUnload() {
    if (audioContext) {
      audioContext.destroy();
    }
  },

  // 跳转到指定章节
  scrollToSection(e) {
    const sectionId = e.currentTarget.dataset.section;
    const index = e.currentTarget.dataset.index;

    this.setData({
      currentSection: index,
      scrollIntoView: sectionId
    });
  },

  // 输入处理
  onInput(e) {
    const id = e.currentTarget.dataset.id;
    const value = e.detail.value;
    this.setData({
      [`inputValues.${id}`]: value
    });
  },

  // 检查单个单词
  checkWord(e) {
    const id = e.currentTarget.dataset.id;
    this.checkSingleWord(id);
  },

  checkSingleWord(id) {
    const input = this.data.inputValues[id] || '';
    const value = input.trim().toLowerCase();
    const vocab = this.data.vocabulary.find(v => v.id === parseInt(id));
    const correctAnswer = vocab.english.toLowerCase();

    let result = { checked: false, correct: false, answer: correctAnswer };

    if (value) {
      result.checked = true;
      result.correct = value === correctAnswer;
    }

    this.setData({
      [`checkResults.${id}`]: result
    });

    // 更新分数
    this.updateScore();
  },

  // 更新分数统计
  updateScore() {
    const results = this.data.checkResults;
    let done = 0;
    let correct = 0;

    for (let id in results) {
      if (results[id].checked) {
        done++;
        if (results[id].correct) correct++;
      }
    }

    const rate = done > 0 ? Math.round(correct / done * 100) : 0;

    this.setData({
      score: { done, correct, rate }
    });
  },

  // 检查全部
  checkAll() {
    const results = {};
    let done = 0;
    let correct = 0;

    this.data.vocabulary.forEach(vocab => {
      const id = vocab.id.toString();
      const input = this.data.inputValues[id] || '';
      const value = input.trim().toLowerCase();
      const correctAnswer = vocab.english.toLowerCase();

      if (value) {
        results[id] = {
          checked: true,
          correct: value === correctAnswer,
          answer: correctAnswer
        };
        done++;
        if (value === correctAnswer) correct++;
      }
    });

    const rate = done > 0 ? Math.round(correct / done * 100) : 0;

    this.setData({
      checkResults: results,
      score: { done, correct, rate }
    });

    if (done === 0) {
      wx.showToast({
        title: '还没有填写任何单词',
        icon: 'none'
      });
    } else {
      wx.showToast({
        title: `正确率 ${rate}%`,
        icon: 'success'
      });
    }
  },

  // 显示答案
  revealAnswers() {
    wx.showModal({
      title: '提示',
      content: '确定要显示所有答案吗？',
      success: (res) => {
        if (res.confirm) {
          const inputValues = {};
          const checkResults = {};

          this.data.vocabulary.forEach(vocab => {
            const id = vocab.id.toString();
            inputValues[id] = vocab.english;
            checkResults[id] = {
              checked: false,
              correct: false,
              answer: vocab.english.toLowerCase(),
              revealed: true
            };
          });

          this.setData({
            inputValues,
            checkResults
          });
        }
      }
    });
  },

  // 清空重做
  clearAll() {
    wx.showModal({
      title: '提示',
      content: '确定要清空所有输入吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            inputValues: {},
            checkResults: {},
            score: { done: 0, correct: 0, rate: 0 }
          });
          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  },

  // 播放发音
  playPronunciation(e) {
    const word = e.currentTarget.dataset.en;

    if (!word) return;

    // 使用有道词典发音API
    const audioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=1`;

    if (audioContext) {
      audioContext.stop();
      audioContext.src = audioUrl;
      audioContext.play();

      wx.showToast({
        title: '🔊 ' + word,
        icon: 'none',
        duration: 800
      });
    }
  },

  // 键盘确认事件
  onConfirm(e) {
    const id = e.currentTarget.dataset.id;
    this.checkSingleWord(id);
  }
});