const { test } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('there is an array of blogs', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)

  assert.strictEqual(result, 1)
})