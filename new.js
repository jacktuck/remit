'use strict'

const uuid = require('node-uuid').v4

const util = require('util')
const EventEmitter = require('events').EventEmitter
util.inherits(Remit, EventEmitter)

const domain = require('domain')

module.exports = function init (opts) {
    opts = opts || {}

    const remit = new Remit(opts)

    return remit
}






function Remit (opts) {
    // Make it so we can still emit using EventEmitter
    this.__emit = this.emit

    // Exposed options
    this._service_name = opts.name || ''
    this._url = opts.url || 'amqp://localhost'
    this._exchange_name = opts.exchange || 'remit'
    this._lazy = !!opts.lazy

    // Internal checkers
    this._publish_channel_consuming = false

    // Internal storage
    this._waiting_emitters = {}

    this.req = require('./lib/req')
    this.treq = require('./lib/treq')
    this.emit = require('./lib/emit')
    this.demit = require('./lib/demit')

    this.res = require('./lib/res')
    this.listen = require('./lib/listen')

    this.once('__assert_connection', this.__connect)
    this.once('__assert_exchange', this.__exchange)
    this.once('__assert_work_channel', this.__work_channel)
    this.once('__assert_publish_channel', this.__publish_channel)

    if (!this._lazy) {
        this.__emit('__assert_connection')
    }

    return this
}






Remit.prototype.__connect = require('./lib/internal/connect')
Remit.prototype.__assert_connection = require('./lib/internal/assertions/connect')

Remit.prototype.__exchange = require('./lib/internal/exchange')
Remit.prototype.__assert_exchange = require('./lib/internal/assertions/exchange')

Remit.prototype.__work_channel = require('./lib/internal/work_channel')
Remit.prototype.__assert_work_channel = require('./lib/internal/assertions/work_channel')

Remit.prototype.__publish_channel = require('./lib/internal/publish_channel')
Remit.prototype.__assert_publish_channel = require('./lib/internal/assertions/publish_channel')

Remit.prototype.__build = require('./lib/internal/builder')
Remit.prototype.__request = require('./lib/internal/request')
Remit.prototype.__on_reply = require('./lib/internal/reply')
