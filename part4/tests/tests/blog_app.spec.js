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

})