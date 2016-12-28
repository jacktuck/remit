const EventEmitter = require('eventemitter3')
const Request = require('./lib/Request')
const Response = require('./lib/Response')
const aliases = require('./resources/aliases')
const connect = require('./lib/assertions/connection')

function Remit (options) {
  options = options || {}

  this._emitter = new EventEmitter()

  this._options = {
    exchange: options.exchange || 'remit'
  }

  this.request = Request.apply(this, [{
    expectReply: true
  }])

  this.persistentRequest = Request.apply(this, [{
    expectReply: true
  }])

  this.emit = Request.apply(this, [{
    expectReply: false
  }])

  this.delayedEmit = Request.apply(this, [{
    expectReply: false
  }])

  this.respond = Response.apply(this, [{
    shouldAck: true,
    shouldReply: true
  }])

  this.listen = Response.apply(this, [{
    shouldAck: true,
    shouldReply: false
  }])

  Object.keys(aliases).forEach((key) => {
    aliases[key].forEach((alias) => {
      this[alias] = this[key]
    })
  })

  connect(
    options.name || process.env.REMIT_NAME || '',
    options.url || process.env.REMIT_URL || 'amqp://localhost'
  )

  return this
}

module.exports = function (options) {
  return new Remit(options)
}
