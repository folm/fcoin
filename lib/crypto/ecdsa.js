/*!
 * ecdsa.js - ecdsa for fcoin
 * Copyright (c) 2016-2017, Christopher Jeffrey (MIT License).
 * https://github.com/folm/fcoin
 */

'use strict';

/**
 * @module crypto/ecdsa
 */

const assert = require('assert');
const elliptic = require('elliptic');
const digest = require('./digest');

/**
 * Verify ECDSA signature.
 * @param {String} curve - Curve name.
 * @param {String} alg - Hash algorithm.
 * @param {Buffer} msg - Signed message.
 * @param {Buffer} sig - Signature.
 * @param {Buffer} key - ASN1 serialized ECDSA key.
 * @returns {Boolean}
 */

exports.verify = function verify(curve, alg, msg, sig, key) {
  assert(typeof curve === 'string', 'No curve selected.');
  assert(typeof alg === 'string', 'No algorithm selected.');
  assert(Buffer.isBuffer(msg));
  assert(Buffer.isBuffer(sig));
  assert(Buffer.isBuffer(key));

  const ec = elliptic.ec(curve);
  const hash = digest.hash(alg, msg);

  try {
    return ec.verify(hash, sig, key);
  } catch (e) {
    return false;
  }
};

/**
 * Sign message with ECDSA key.
 * @memberof module:crypto/pk.ecdsa
 * @param {String} curve - Curve name.
 * @param {String} alg - Hash algorithm.
 * @param {Buffer} msg - Signed message.
 * @param {Buffer} key - ASN1 serialized ECDSA key.
 * @returns {Buffer} Signature (DER)
 */

exports.sign = function sign(curve, alg, msg, key) {
  assert(typeof curve === 'string', 'No curve selected.');
  assert(typeof alg === 'string', 'No algorithm selected.');
  assert(Buffer.isBuffer(msg));
  assert(Buffer.isBuffer(key));

  const ec = elliptic.ec(curve);
  const hash = digest.hash(alg, msg);
  const sig = ec.sign(hash, key, { canonical: true });

  return Buffer.from(sig.toDER());
};
