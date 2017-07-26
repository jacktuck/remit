/* global describe, it, expect, sinon, remit */
// describe('queueInfo', function () {
//   it('should return null if not found', function (done) {
//     remit.req('foo')
//     .options({
//       .queueInfo()
//       .then((result) => {
//         expect(result).to.equal(null)
//         done()
//       })
//       .catch(err => {
//         done(err)
//       })
//   })
//
//   it('should return queue info if found', function (done) {
//       remit.res('baz').ready()
//       .then(() => {
//         remit.req('baz')
//         .options({
//         .queueInfo()
//         .then((result) => {
//           const expected = { queue: 'baz', messageCount: 0, consumerCount: 1 }
//           expect(result).to.deep.equal(expected)
//           done()
//         })
//         .catch(err => {
//           done(err)
//         })
//     })
//   })
// })

describe('queueInfo', function () {
  // it('should return null if not found', function (done) {
  //   remit.emit('foobar')
  //   .options({ delay: 6e5 })
  //     .queueInfo()
  //     .then((result) => {
  //       expect(result).to.equal(null)
  //       done()
  //     })
  //     .catch(err => {
  //       done(err)
  //     })
  // })
  //
  it('should return queue info if found', function (done) {
    let requestToMake = remit
      .emit('bazfoo')
      .options({ delay: 6e5 })

    remit.listen('bazfoo').ready().then(() => {
      console.log('SENDING REQUEST')
      return requestToMake.send()
    })
    .then(() => {
      console.log('SENDING Q INFO')
      return requestToMake.queueInfo()
    })
    .then((result) => {
      console.log('GOT QUEUE INFO', result)

      const expected = {
        queue: 'd:remit:bazfoo:6000',
        messageCount: 0,
        consumerCount: 1
      }

      expect(result).to.not.equal(null)
      expect(result).to.deep.equal(expected)
      done()
    })
    .catch(err => {
      done(err)
    })
  })
})
