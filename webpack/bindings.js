'use strict';

module.exports = function bindings(name) {
  switch (name) {
    case 'leveldown':
      return require('leveldown/build/Release/leveldown.node');
    case 'fcoin-native':
      return require('fcoin-native/build/Release/fcoin-native.node');
    case 'secp256k1':
      return require('secp256k1/build/Release/secp256k1.node');
  }
  throw new Error(`Cannot find module "${name}".`);
};
