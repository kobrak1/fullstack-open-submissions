const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('admin')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('admin logged in', { exact: true })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('admin1')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('admin')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('admin logged in', { exact: true })).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('WW2')
      await page.getByTestId('author').fill('Celal Sengor')
      await page.getByTestId('url').fill('arabam.com')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })
  })

})