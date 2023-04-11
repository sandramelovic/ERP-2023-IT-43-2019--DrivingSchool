"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putUser = exports.protect = exports.postUser = exports.logout = exports.login = exports.getUsers = exports.getUserById = exports.deleteUser = void 0;
var _database = require("../database");
var _util = require("util");
var bcrypt = _interopRequireWildcard(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = require("../config");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var jwt_decode = _interopRequireWildcard(require("jwt-decode"));
var _authorize = _interopRequireDefault(require("../helpers/authorize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var pool, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context.sent;
          _context.next = 6;
          return pool.request().query(_database.query.getUsers);
        case 6:
          result = _context.sent;
          res.json(result.recordset);
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500);
          res.send(_context.t0.message);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getUsers = getUsers;
var getUserById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, pool, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context2.sent;
          _context2.next = 7;
          return pool.request().input("id", id).query(_database.query.getUserById);
        case 7:
          result = _context2.sent;
          res.send(result.recordset[0]);
          _context2.next = 15;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.status(500);
          res.send(_context2.t0.message);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function getUserById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getUserById = getUserById;
var deleteUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, pool, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context3.sent;
          _context3.next = 7;
          return pool.request().input("id", id).query(_database.query.deleteUser);
        case 7:
          result = _context3.sent;
          res.sendStatus(204);
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          res.status(500);
          res.send(_context3.t0.message);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function deleteUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteUser = deleteUser;
var putUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, nameSurename, address, birthDate, jmbg, phoneNumber, username, role, password, id, pool, salt;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, nameSurename = _req$body.nameSurename, address = _req$body.address, birthDate = _req$body.birthDate, jmbg = _req$body.jmbg, phoneNumber = _req$body.phoneNumber, username = _req$body.username, role = _req$body.role;
          password = req.body.password;
          id = req.params.id;
          if (!(nameSurename == null || jmbg == null || phoneNumber == null || username == null || password == null)) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            msg: "Bad Request. Please fill all fields"
          }));
        case 5:
          _context4.prev = 5;
          _context4.next = 8;
          return (0, _database.getConnection)();
        case 8:
          pool = _context4.sent;
          _context4.next = 11;
          return bcrypt.genSalt(_config.HASH_SALT);
        case 11:
          salt = _context4.sent;
          _context4.next = 14;
          return bcrypt.hash(password, salt);
        case 14:
          password = _context4.sent;
          _context4.next = 17;
          return pool.request().input("nameSurename", _database.sql.VarChar, nameSurename).input("address", _database.sql.VarChar, address).input("birthDate", _database.sql.Date, birthDate).input("jmbg", _database.sql.VarChar, jmbg).input("phoneNumber", _database.sql.VarChar, phoneNumber).input("role", _database.sql.Bit, role).input("username", _database.sql.VarChar, username).input("password", _database.sql.Char, password).input("id", _database.sql.Int, id).query(_database.query.putUser);
        case 17:
          res.json({
            nameSurename: nameSurename,
            address: address,
            birthDate: birthDate,
            jmbg: jmbg,
            phoneNumber: phoneNumber,
            role: role,
            username: username,
            password: password
          });
          _context4.next = 24;
          break;
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](5);
          res.status(500);
          res.send(_context4.t0.message);
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 20]]);
  }));
  return function putUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.putUser = putUser;
var postUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body2, nameSurename, address, birthDate, jmbg, phoneNumber, username, _req$body3, password, role, userId, pool, salt, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body2 = req.body, nameSurename = _req$body2.nameSurename, address = _req$body2.address, birthDate = _req$body2.birthDate, jmbg = _req$body2.jmbg, phoneNumber = _req$body2.phoneNumber, username = _req$body2.username;
          _req$body3 = req.body, password = _req$body3.password, role = _req$body3.role;
          userId = '';
          if (!(nameSurename == null || jmbg == null || phoneNumber == null || username == null || password == null)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            msg: "Bad Request. Please fill all fields"
          }));
        case 6:
          _context5.next = 8;
          return (0, _database.getConnection)();
        case 8:
          pool = _context5.sent;
          _context5.next = 11;
          return bcrypt.genSalt(_config.HASH_SALT);
        case 11:
          salt = _context5.sent;
          _context5.next = 14;
          return bcrypt.hash(password, salt);
        case 14:
          password = _context5.sent;
          _context5.next = 17;
          return pool.request().input("nameSurename", _database.sql.VarChar, nameSurename).input("address", _database.sql.VarChar, address).input("birthDate", _database.sql.Date, birthDate).input("jmbg", _database.sql.VarChar, jmbg).input("phoneNumber", _database.sql.VarChar, phoneNumber).input("role", _database.sql.VarChar, role).input("username", _database.sql.VarChar, username).input("password", _database.sql.VarChar, password).query(_database.query.postUser);
        case 17:
          if (res) {
            _context5.next = 19;
            break;
          }
          throw new Error('Sig up error. Please try again.');
        case 19:
          _context5.next = 21;
          return pool.request().input("username", _database.sql.VarChar, username).query(_database.query.findUserId);
        case 21:
          result = _context5.sent;
          userId = result.recordset[0].userId;
          createSendToken({
            id: userId,
            username: username
          }, res);
          _context5.next = 30;
          break;
        case 26:
          _context5.prev = 26;
          _context5.t0 = _context5["catch"](0);
          console.log("\u26D4\u26D4\u26D4 SIGNUP: ".concat(_context5.t0.message));
          res.status(404).json({
            status: 'fail',
            message: _context5.t0.message
          });
        case 30:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 26]]);
  }));
  return function postUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.postUser = postUser;
var login = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body4, username, password, pool, result, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body4 = req.body, username = _req$body4.username, password = _req$body4.password;
          if (!(!username || !password)) {
            _context6.next = 4;
            break;
          }
          throw new Error("Please provide email and password");
        case 4:
          _context6.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context6.sent;
          _context6.next = 9;
          return pool.request().input("username", _database.sql.VarChar, username).input("password", _database.sql.VarChar, password).query(_database.query.loginUser);
        case 9:
          result = _context6.sent;
          user = result.recordset[0];
          _context6.t0 = !user;
          if (_context6.t0) {
            _context6.next = 16;
            break;
          }
          _context6.next = 15;
          return correctPassword(password, user.password);
        case 15:
          _context6.t0 = !_context6.sent;
        case 16:
          if (!_context6.t0) {
            _context6.next = 18;
            break;
          }
          throw new Error('Incorrect username or password');
        case 18:
          // 401: Error for user not found

          createSendToken(user, res);
          _context6.next = 25;
          break;
        case 21:
          _context6.prev = 21;
          _context6.t1 = _context6["catch"](0);
          console.log("\u26D4\u26D4\u26D4 LOGIN: ".concat(_context6.t1.message));
          res.status(401).json({
            status: 'fail',
            message: _context6.t1.message
          });
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 21]]);
  }));
  return function login(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.login = login;
function createSendToken(user, res) {
  var token = signToken(user.userId);
  // Cookie to store the jwt for future to verify protected routes
  var cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    // To mS = D * Hs * min * mS
    httpOnly: true // The browser will not access or modify the cookie
  };

  // Only will be send on an encrypted connection (https). In Production only we have encrypted connection
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie(_config.COOKIE_JWT, token, cookieOptions);

  // Remove the password from the output
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    token: token,
    data: {
      user: user
    }
  });
}
function signToken(id) {
  var payload = {
    "id": id
  };
  //let token = jwt.sign( payload,'secret',  { noTimestamp:true, expiresIn: '1h' })

  return _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}
function correctPassword(_x13, _x14) {
  return _correctPassword.apply(this, arguments);
}
function _correctPassword() {
  _correctPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(candidatePassword, userPassword) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return bcrypt.compare(candidatePassword, userPassword);
        case 2:
          return _context8.abrupt("return", _context8.sent);
        case 3:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _correctPassword.apply(this, arguments);
}
var protect = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var token, decoded, result, currentUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          // 1) Getting token and check if it's there.
          if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[2];
          } else if (req.cookie.jwt) {
            token = req.cookie.jwt;
          }
          if (!token) res.status(401).json({
            status: 'fail',
            message: 'Token not valid. Please Log in again.'
          });
          // 2) Verification token
          // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET); // Of course, possible errors must be caught and handled in the error functions handler.
          // This is only an example, so I'll not do it but of course, in a real application is a must.
          // 3) Check if user still exists
          _context7.next = 6;
          return (0, _database.getConnection)();
        case 6:
          _context7.next = 8;
          return _context7.sent.request().query("SELECT * FROM Users WHERE userId = '".concat(decoded.id, "'"));
        case 8:
          result = _context7.sent;
          currentUser = result.recordset[0];
          if (currentUser) {
            _context7.next = 12;
            break;
          }
          throw new Error('User not found');
        case 12:
          // 4) Check if user changed password after the token was issued
          // -- TO-DO

          // To access current user information in each request and templates (res.locals)
          req.user = currentUser;
          res.locals.user = currentUser;
          _context7.next = 19;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](0);
          res.status(401).json({
            status: 'fail',
            message: _context7.t0.message
          });
        case 19:
          next();
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 16]]);
  }));
  return function protect(_x15, _x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();
exports.protect = protect;
exports.authRole = function (role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      res.status(401);
      return res.send('Not allowed');
    }
    next();
  };
};
var logout = function logout(req, res) {
  res.cookie(_config.COOKIE_JWT, 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    // In 10sec
    httpOnly: true
  });
  res.status(200).json({
    status: 'success'
  });
};
exports.logout = logout;