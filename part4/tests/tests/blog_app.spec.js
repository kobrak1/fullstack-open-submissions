const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5001/api/testing/reset')
    await request.post('http://localhost:5001/api/users', {
      data: {
        name: 'admin',
        username: 'admin',
        password: 'admin'
      }
    })
    await page.goto('http://localhost:5173')
  })


  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'register' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'admin', 'admin')
      await expect(page.getByText('admin logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'admin1', 'admin1')
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'admin', 'admin')
      await expect(page.getByText('admin logged in', { exact: true })).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'sample_title', 'sample_author', 'sample_url.com')
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })
  })

  describe('A blog can be edited', () => {
    beforeEach(async ({page}) => {
      loginWith(page, 'admin', 'admin')
      createBlog(page, 'sample_title', 'sample_author', 'sample_url.com')
    })

    test('when a user click the like button it increases the like count', async ({page}) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })

})