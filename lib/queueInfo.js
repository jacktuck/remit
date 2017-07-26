const debug = require('debug')('remit:info')

function queueInfo (queueName) {
  debug('queueName', queueName)

  let remit = this

  let workChannel
  return remit._workChannelPool.acquire()
    .then(channel => {
      workChannel = channel
      return channel.checkQueue(queueName)
    })
    .then((result) => {
      debug('result', result)

      remit._workChannelPool.release(workChannel)
      return result
    })
    .catch(err => {
      debug(`Could not check queue '${queueName}'. Destroying transient channel from pool.`, err)

      remit._workChannelPool.destroy(workChannel)

      return null
    })
}

module.exports = queueInfo
