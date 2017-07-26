/* global describe, it, expect, sinon, remit */
describe('queueInfo', function () {
  it('should return null if not found', function (done) {
    remit.request('foo')
      .queueInfo()
      .then((result) => {
        expect(result).to.equal(null)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('should return queue info if found', function (done) {
      remit.res('baz').ready()
      .then(() => {
        remit.req('baz')
        .queueInfo()
        .then((result) => {
          const expected = { queue: 'baz', messageCount: 0, consumerCount: 1 }
          expect(result).to.deep.equal(expected)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})
