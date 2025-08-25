#!/usr/bin/env ts-node

import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/api/revalidate'
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

if (!WEBHOOK_SECRET) {
  console.error('❌ WEBHOOK_SECRET environment variable is required')
  process.exit(1)
}

async function testWebhook() {
  try {
    console.log('🧪 Testing webhook endpoint...')
    console.log(`📍 URL: ${WEBHOOK_URL}`)
    
    // Test GET request first
    console.log('\n1️⃣ Testing GET request...')
    const getResponse = await fetch(WEBHOOK_URL)
    const getData = await getResponse.json()
    
    if (getResponse.ok) {
      console.log('✅ GET request successful')
      console.log('📄 Response:', getData)
    } else {
      console.log('❌ GET request failed')
      console.log('📄 Response:', getData)
    }
    
    // Test POST request with mock payload
    console.log('\n2️⃣ Testing POST request with authentication...')
    const mockPayload = {
      sys: {
        type: 'Entry',
        id: 'test-entry-id',
        contentType: {
          sys: {
            id: 'pageContent'
          }
        }
      },
      fields: {
        title: {
          'en-US': 'Test Content'
        }
      }
    }
    
    const postResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WEBHOOK_SECRET}`
      },
      body: JSON.stringify(mockPayload)
    })
    
    const postData = await postResponse.json()
    
    if (postResponse.ok) {
      console.log('✅ POST request successful')
      console.log('📄 Response:', postData)
    } else {
      console.log('❌ POST request failed')
      console.log('📄 Response:', postData)
    }
    
    // Test unauthorized request
    console.log('\n3️⃣ Testing unauthorized request...')
    const unauthorizedResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer wrong-secret'
      },
      body: JSON.stringify(mockPayload)
    })
    
    const unauthorizedData = await unauthorizedResponse.json()
    
    if (unauthorizedResponse.status === 401) {
      console.log('✅ Unauthorized request correctly rejected')
      console.log('📄 Response:', unauthorizedData)
    } else {
      console.log('❌ Unauthorized request should have been rejected')
      console.log('📄 Response:', unauthorizedData)
    }
    
    console.log('\n🎉 Webhook testing complete!')
    
  } catch (error) {
    console.error('❌ Error testing webhook:', error)
    process.exit(1)
  }
}

// Run the test
testWebhook()