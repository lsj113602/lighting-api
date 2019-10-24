import crypto from 'crypto';

/**
 * @util 加密、解密工具类
 */
class CryptoUtil {

  /**
   * 解密
   * @param dataStr {string}
   * @param key {string}
   * @param iv {string}
   * @return {string}
   */
  static Decrypt(dataStr, key = 'lsj', iv = 'lsj') {
    let cipherChunks = [];
    let decipher = crypto.createDecipher('aes192', key);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(dataStr, 'base64', 'utf8'));
    cipherChunks.push(decipher.final('utf8'));
    return cipherChunks.join('');
  }

  /**
   * 加密
   * @param dataStr {string}
   * @param key {string}
   * @param iv {string}
   * @return {string}
   */
  static Encrypt(dataStr, key = 'lsj', iv = 'lsj') {
    console.log(1, key, iv)
    let cipherChunks = [];
    let cipher = crypto.createCipher('aes192', key);
    console.log(2)
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(dataStr, 'utf8', 'base64'));
    console.log(3)
    cipherChunks.push(cipher.final('base64'));
    console.log(4)
    return cipherChunks.join('');
  }
}

module.exports = CryptoUtil;