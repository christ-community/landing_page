#!/usr/bin/env node

/**
 * Cleanup Contentful Space
 * 
 * This script will:
 * 1. Delete all entries
 * 2. Delete all content types
 * 3. Clean up the space for fresh setup
 */

import { createClient } from 'contentful-management'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
})

async function cleanupSpace() {
  console.log('🧹 Starting Contentful cleanup...')
  
  try {
    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')
    
    // Step 1: Get all entries and unpublish/delete them
    console.log('📋 Fetching all entries...')
    const entries = await environment.getEntries({ limit: 1000 })
    console.log(`Found ${entries.items.length} entries`)
    
    for (const entry of entries.items) {
      try {
        // Unpublish if published
        if (entry.sys.publishedVersion) {
          await entry.unpublish()
          console.log(`📤 Unpublished entry: ${entry.sys.id}`)
        }
        
        // Delete the entry
        await entry.delete()
        console.log(`🗑️  Deleted entry: ${entry.sys.id}`)
      } catch (error) {
        console.log(`⚠️  Could not delete entry ${entry.sys.id}:`, (error as any).message)
      }
    }
    
    // Step 2: Get all assets and unpublish/delete them
    console.log('🖼️  Fetching all assets...')
    const assets = await environment.getAssets({ limit: 1000 })
    console.log(`Found ${assets.items.length} assets`)
    
    for (const asset of assets.items) {
      try {
        // Unpublish if published
        if (asset.sys.publishedVersion) {
          await asset.unpublish()
          console.log(`📤 Unpublished asset: ${asset.sys.id}`)
        }
        
        // Delete the asset
        await asset.delete()
        console.log(`🗑️  Deleted asset: ${asset.sys.id}`)
      } catch (error) {
        console.log(`⚠️  Could not delete asset ${asset.sys.id}:`, (error as any).message)
      }
    }
    
    // Step 3: Get all content types and unpublish/delete them
    console.log('📝 Fetching all content types...')
    const contentTypes = await environment.getContentTypes({ limit: 1000 })
    console.log(`Found ${contentTypes.items.length} content types`)
    
    for (const contentType of contentTypes.items) {
      try {
        // Unpublish if published
        if (contentType.sys.publishedVersion) {
          await contentType.unpublish()
          console.log(`📤 Unpublished content type: ${contentType.name}`)
        }
        
        // Delete the content type
        await contentType.delete()
        console.log(`🗑️  Deleted content type: ${contentType.name}`)
      } catch (error) {
        console.log(`⚠️  Could not delete content type ${contentType.name}:`, (error as any).message)
      }
    }
    
    console.log('🎉 Cleanup completed!')
    
    // Verify cleanup
    const remainingEntries = await environment.getEntries({ limit: 10 })
    const remainingAssets = await environment.getAssets({ limit: 10 })
    const remainingContentTypes = await environment.getContentTypes({ limit: 10 })
    
    console.log(`\n📊 Cleanup verification:`)
    console.log(`   Remaining entries: ${remainingEntries.items.length}`)
    console.log(`   Remaining assets: ${remainingAssets.items.length}`)
    console.log(`   Remaining content types: ${remainingContentTypes.items.length}`)
    
    if (remainingEntries.items.length === 0 && 
        remainingAssets.items.length === 0 && 
        remainingContentTypes.items.length === 0) {
      console.log('✅ Space is completely clean!')
    } else {
      console.log('⚠️  Some items could not be deleted (this is normal for system content)')
    }
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
    throw error
  }
}

// Run the cleanup
if (require.main === module) {
  cleanupSpace()
    .then(() => console.log('\n✅ Cleanup completed successfully!'))
    .catch(console.error)
}