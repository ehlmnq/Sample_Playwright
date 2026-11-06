import {test, expect} from '@playwright/test'
import { env } from 'node:process'

test('simple browser test', async ({page})=>{
    await page.goto('/AutomationPractice/')
    const title = await page.title();
    expect(title).toEqual('Practice Page')
})

test('Simple API test get call', async ({request})=>{
    const apiBaseUrl = env.API_BASE_URL || 'https://jsonplaceholder.typicode.com'
    const response = await request.get(new URL('/posts/1', apiBaseUrl).toString())
    const responseBody = await response.json()
    expect(response.status()).toEqual(200)
    expect(responseBody).toEqual({"userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body":expect.any(String)
})
})

test('post request', async ({request})=>{
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
        title: 'Playwright API Test',
        body: 'This is my first POST API request',
        userId: 1
        }
    })

    const capt = await response.text()
    const obj = Object.entries(capt)

    for (const key in obj){
        console.log(obj[key])
    }
    expect(response.status()).toBe(201)

})