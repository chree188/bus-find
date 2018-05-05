const globalData = getApp().globalData;
const storageKey = globalData.storageKey;
const storageValue = globalData.storageValue;

// 设置storage数据
function setStorage(storageKey, storageValue) {
  wx.setStorage({ key: storageKey, data: JSON.stringify(storageValue) });
}

// 检查storage中是否存在某键值
function hasKey(storageKey, keyName) {
  return storageValue[storageKey].keyName.includes(keyName);
}

// 添加storage数据
function addStorage(storageKey, keyName, value) {
  const currStorage = storageValue[storageKey];
  // 修改数据
  currStorage.keyName.unshift(keyName);
  currStorage.value.unshift(value);
  // 最多存储20条数据
  if (currStorage.keyName.length > 20) {
    currStorage.keyName.pop();
    currStorage.value.pop();
  }
  setStorage(storageKey, currStorage);
}

// 删除storage数据
function deleteStorage(storageKey, keyName) {
  const currStorage = storageValue[storageKey];
  const index = currStorage.keyName.indexOf(keyName);
  // 修改数据
  currStorage.keyName.splice(index, 1);
  currStorage.value.splice(index, 1);
  setStorage(storageKey, currStorage);
}

// 清空storage数据
function clearStorage(storageKey) {
  const currStorage = storageValue[storageKey];
  currStorage.keyName = [];
  currStorage.value = [];
  wx.removeStorage({ key: storageKey });
}

// 获取收藏数据
function getCollected() {
  return storageValue.collected;
}
// 获取最近使用
function getRecently() {
  return storageValue.recently;
}

// 是否已经被收藏
function hasCollected(keyName) {
  return hasKey(storageKey.collected, keyName);
}

// 添加收藏数据
function addCollected(data) {
  const { keyName, ...value } = data;
  addStorage(storageKey.collected, keyName, value);
}
// 添加最近使用
function addRecently(data) {
  const { keyName, ...value } = data;
  const currKey = storageKey.recently;
  // 是否已经在最近使用记录里
  if (hasKey(currKey, keyName)) {
    deleteStorage(currKey, keyName);
  }
  addStorage(currKey, keyName, value);
}

// 删除收藏数据
function deleteCollected(keyName) {
  deleteStorage(storageKey.collected, keyName);
}
// 删除最近使用
function deleteRecently(keyName) {
  deleteStorage(storageKey.recently, keyName);
}

// 清空收藏数据
function clearCollected() {
  clearStorage(storageKey.collected);
}
// 清空最近使用
function clearRecently() {
  clearStorage(storageKey.recently);
}

module.exports = {
  getCollected,
  getRecently,
  hasCollected,
  addCollected,
  addRecently,
  deleteCollected,
  deleteRecently,
  clearCollected,
  clearRecently,
};
