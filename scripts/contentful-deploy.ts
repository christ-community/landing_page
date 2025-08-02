#!/usr/bin/env node

/**
 * Complete Contentful Deployment Script
 * 
 * This script handles deployment of Contentful changes including:
 * 1. Environment management
 * 2. Content type updates
 * 3. Content migration between environments
 * 4. Production deployment
 * 5. Rollback capabilities
 */

import { createClient } from 'contentful-management'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

interface DeployOptions {
  environment?: string
  sourceEnvironment?: string
  skipBackup?: boolean
  skipValidation?: boolean
  dryRun?: boolean
}

class ContentfulDeploy {
  private managementClient: any
  private spaceId: string
  private accessToken: string

  constructor() {
    this.validateEnvironmentVars()
    this.spaceId = process.env.CONTENTFUL_SPACE_ID!
    this.accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN!
    this.managementClient = createClient({
      accessToken: this.accessToken
    })
  }

  private validateEnvironmentVars() {
    const requiredVars = [
      'CONTENTFUL_SPACE_ID',
      'CONTENTFUL_MANAGEMENT_TOKEN'
    ]

    const missing = requiredVars.filter(varName => !process.env[varName])
    
    if (missing.length > 0) {
      console.error('❌ Missing required environment variables:')
      missing.forEach(varName => console.error(`   - ${varName}`))
      process.exit(1)
    }
  }

  async createEnvironment(environmentId: string, sourceEnvironmentId: string = 'master') {
    console.log(`🚀 Creating environment "${environmentId}" from "${sourceEnvironmentId}"...`)
    
    try {
      const space = await this.managementClient.getSpace(this.spaceId)
      
      // Check if environment already exists
      try {
        const existingEnv = await space.getEnvironment(environmentId)
        console.log(`⚠️  Environment "${environmentId}" already exists`)
        return existingEnv
      } catch (error) {
        // Environment doesn't exist, create it
      }
      
      const environment = await space.createEnvironmentWithId(environmentId, {
        name: environmentId,
        sourceEnvironment: {
          sys: {
            type: 'Link',
            linkType: 'Environment',
            id: sourceEnvironmentId
          }
        }
      })
      
      console.log(`✅ Environment "${environmentId}" created`)
      
      // Wait for environment to be ready
      console.log('⏳ Waiting for environment to be ready...')
      await this.waitForEnvironmentReady(space, environmentId)
      
      return environment
    } catch (error) {
      console.error(`❌ Failed to create environment "${environmentId}":`, error)
      throw error
    }
  }

  async waitForEnvironmentReady(space: any, environmentId: string, maxWaitTime: number = 300000) {
    const startTime = Date.now()
    
    while (Date.now() - startTime < maxWaitTime) {
      try {
        const environment = await space.getEnvironment(environmentId)
        if (environment.sys.status?.sys.id === 'ready') {
          console.log(`✅ Environment "${environmentId}" is ready`)
          return environment
        }
      } catch (error) {
        // Environment not ready yet
      }
      
      console.log('⏳ Still waiting for environment...')
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
    
    throw new Error(`Environment "${environmentId}" did not become ready within ${maxWaitTime}ms`)
  }

  async backupEnvironment(environmentId: string) {
    console.log(`💾 Creating backup of environment "${environmentId}"...`)
    
    const backupId = `backup-${environmentId}-${Date.now()}`
    
    try {
      await this.createEnvironment(backupId, environmentId)
      console.log(`✅ Backup created as environment "${backupId}"`)
      return backupId
    } catch (error) {
      console.error(`❌ Failed to create backup:`, error)
      throw error
    }
  }

  async validateEnvironment(environmentId: string) {
    console.log(`🔍 Validating environment "${environmentId}"...`)
    
    try {
      const space = await this.managementClient.getSpace(this.spaceId)
      const environment = await space.getEnvironment(environmentId)
      
      // Validate content types
      const contentTypes = await environment.getContentTypes()
      console.log(`✅ Found ${contentTypes.items.length} content types`)
      
      // Validate entries
      const entries = await environment.getEntries({ limit: 1000 })
      console.log(`✅ Found ${entries.items.length} entries`)
      
      // Check for published content
      const publishedEntries = entries.items.filter((entry: any) => entry.sys.publishedVersion)
      console.log(`✅ Found ${publishedEntries.length} published entries`)
      
      return {
        contentTypes: contentTypes.items.length,
        entries: entries.items.length,
        publishedEntries: publishedEntries.length
      }
    } catch (error) {
      console.error(`❌ Environment validation failed:`, error)
      throw error
    }
  }

  async deployToProduction(sourceEnvironmentId: string, options: DeployOptions) {
    console.log(`🚀 Deploying from "${sourceEnvironmentId}" to production...`)
    
    try {
      const space = await this.managementClient.getSpace(this.spaceId)
      
      // Step 1: Backup production if not skipped
      let backupId: string | undefined
      if (!options.skipBackup) {
        backupId = await this.backupEnvironment('master')
      }
      
      // Step 2: Validate source environment
      if (!options.skipValidation) {
        await this.validateEnvironment(sourceEnvironmentId)
      }
      
      // Step 3: Get source environment
      const sourceEnvironment = await space.getEnvironment(sourceEnvironmentId)
      
      // Step 4: Get all content from source environment
      console.log('📋 Copying content types...')
      const sourceContentTypes = await sourceEnvironment.getContentTypes()
      
      console.log('📋 Copying entries...')
      const sourceEntries = await sourceEnvironment.getEntries({ limit: 1000 })
      
      console.log('📋 Copying assets...')
      const sourceAssets = await sourceEnvironment.getAssets({ limit: 1000 })
      
      if (options.dryRun) {
        console.log('🔍 DRY RUN - Would deploy:')
        console.log(`   - ${sourceContentTypes.items.length} content types`)
        console.log(`   - ${sourceEntries.items.length} entries`) 
        console.log(`   - ${sourceAssets.items.length} assets`)
        return
      }
      
      // Step 5: Deploy to master environment
      const masterEnvironment = await space.getEnvironment('master')
      
      // Deploy content types first
      for (const contentType of sourceContentTypes.items) {
        try {
          const existingContentType = await masterEnvironment.getContentType(contentType.sys.id)
          
          // Update existing content type
          existingContentType.name = contentType.name
          existingContentType.description = contentType.description
          existingContentType.fields = contentType.fields
          
          const updatedContentType = await existingContentType.update()
          await updatedContentType.publish()
          
          console.log(`✅ Updated content type: ${contentType.name}`)
        } catch (error) {
          // Content type doesn't exist, create it
          try {
            const newContentType = await masterEnvironment.createContentTypeWithId(contentType.sys.id, {
              name: contentType.name,
              description: contentType.description,
              fields: contentType.fields
            })
            await newContentType.publish()
            console.log(`✅ Created content type: ${contentType.name}`)
          } catch (createError) {
            console.error(`❌ Failed to create content type ${contentType.name}:`, createError)
          }
        }
      }
      
      // Deploy assets
      for (const asset of sourceAssets.items) {
        try {
          const existingAsset = await masterEnvironment.getAsset(asset.sys.id)
          
          // Update existing asset
          existingAsset.fields = asset.fields
          const updatedAsset = await existingAsset.update()
          if (asset.sys.publishedVersion) {
            await updatedAsset.publish()
          }
          
          console.log(`✅ Updated asset: ${asset.fields.title?.['en-US'] || asset.sys.id}`)
        } catch (error) {
          // Asset doesn't exist, create it
          try {
            const newAsset = await masterEnvironment.createAssetWithId(asset.sys.id, {
              fields: asset.fields
            })
            if (asset.sys.publishedVersion) {
              await newAsset.publish()
            }
            console.log(`✅ Created asset: ${asset.fields.title?.['en-US'] || asset.sys.id}`)
          } catch (createError) {
            console.error(`❌ Failed to create asset ${asset.sys.id}:`, createError)
          }
        }
      }
      
      // Deploy entries
      for (const entry of sourceEntries.items) {
        try {
          const existingEntry = await masterEnvironment.getEntry(entry.sys.id)
          
          // Update existing entry
          existingEntry.fields = entry.fields
          const updatedEntry = await existingEntry.update()
          if (entry.sys.publishedVersion) {
            await updatedEntry.publish()
          }
          
          console.log(`✅ Updated entry: ${entry.sys.id}`)
        } catch (error) {
          // Entry doesn't exist, create it
          try {
            const newEntry = await masterEnvironment.createEntryWithId(entry.sys.contentType.sys.id, entry.sys.id, {
              fields: entry.fields
            })
            if (entry.sys.publishedVersion) {
              await newEntry.publish()
            }
            console.log(`✅ Created entry: ${entry.sys.id}`)
          } catch (createError) {
            console.error(`❌ Failed to create entry ${entry.sys.id}:`, createError)
          }
        }
      }
      
      console.log('🎉 Deployment to production completed!')
      
      if (backupId) {
        console.log(`💾 Backup available in environment: ${backupId}`)
      }
      
    } catch (error) {
      console.error('❌ Deployment failed:', error)
      throw error
    }
  }

  async rollback(backupEnvironmentId: string) {
    console.log(`🔄 Rolling back to backup environment "${backupEnvironmentId}"...`)
    
    try {
      await this.deployToProduction(backupEnvironmentId, { skipBackup: true, skipValidation: false })
      console.log('✅ Rollback completed successfully')
    } catch (error) {
      console.error('❌ Rollback failed:', error)
      throw error
    }
  }

  async listEnvironments() {
    console.log('📋 Listing all environments...')
    
    try {
      const space = await this.managementClient.getSpace(this.spaceId)
      const environments = await space.getEnvironments()
      
      console.log('\nEnvironments:')
      for (const env of environments.items) {
        const status = env.sys.status?.sys.id || 'unknown'
        const createdAt = new Date(env.sys.createdAt).toLocaleDateString()
        console.log(`  - ${env.sys.id} (${status}) - created ${createdAt}`)
      }
      
      return environments.items
    } catch (error) {
      console.error('❌ Failed to list environments:', error)
      throw error
    }
  }

  async deleteEnvironment(environmentId: string) {
    if (environmentId === 'master') {
      console.error('❌ Cannot delete master environment')
      return
    }
    
    console.log(`🗑️  Deleting environment "${environmentId}"...`)
    
    try {
      const space = await this.managementClient.getSpace(this.spaceId)
      const environment = await space.getEnvironment(environmentId)
      await environment.delete()
      
      console.log(`✅ Environment "${environmentId}" deleted`)
    } catch (error) {
      console.error(`❌ Failed to delete environment "${environmentId}":`, error)
      throw error
    }
  }
}

// CLI interface
function parseArgs() {
  const args = process.argv.slice(2)
  const command = args[0]
  const options: DeployOptions = {}
  
  // Parse options
  const envIndex = args.indexOf('--env')
  if (envIndex !== -1 && args[envIndex + 1]) {
    options.environment = args[envIndex + 1]
  }
  
  const sourceIndex = args.indexOf('--source')
  if (sourceIndex !== -1 && args[sourceIndex + 1]) {
    options.sourceEnvironment = args[sourceIndex + 1]
  }
  
  if (args.includes('--skip-backup')) options.skipBackup = true
  if (args.includes('--skip-validation')) options.skipValidation = true
  if (args.includes('--dry-run')) options.dryRun = true
  
  return { command, options }
}

function showHelp() {
  console.log(`
Contentful Deployment Script

Usage: npm run contentful:deploy <command> [options]

Commands:
  create-env <env-id>     Create a new environment
  deploy                  Deploy to production from source environment
  rollback <backup-env>   Rollback to backup environment
  list                    List all environments
  delete-env <env-id>     Delete an environment
  validate <env-id>       Validate an environment

Options:
  --env <environment>     Target environment (default: master)
  --source <environment>  Source environment for deployment
  --skip-backup           Skip creating backup before deployment
  --skip-validation       Skip validation steps
  --dry-run              Show what would be done without making changes
  --help                 Show this help message

Examples:
  npm run contentful:deploy create-env staging
  npm run contentful:deploy deploy --source staging
  npm run contentful:deploy rollback backup-master-1234567890
  npm run contentful:deploy list
  npm run contentful:deploy validate staging
`)
}

// Run if called directly
if (require.main === module) {
  const { command, options } = parseArgs()
  
  if (!command || command === '--help') {
    showHelp()
    process.exit(0)
  }
  
  const deploy = new ContentfulDeploy()
  
  switch (command) {
    case 'create-env':
      const envId = process.argv[3]
      if (!envId) {
        console.error('❌ Environment ID required')
        process.exit(1)
      }
      deploy.createEnvironment(envId, options.sourceEnvironment)
      break
      
    case 'deploy':
      if (!options.sourceEnvironment) {
        console.error('❌ Source environment required (use --source)')
        process.exit(1)
      }
      deploy.deployToProduction(options.sourceEnvironment, options)
      break
      
    case 'rollback':
      const backupEnv = process.argv[3]
      if (!backupEnv) {
        console.error('❌ Backup environment ID required')
        process.exit(1)
      }
      deploy.rollback(backupEnv)
      break
      
    case 'list':
      deploy.listEnvironments()
      break
      
    case 'delete-env':
      const deleteEnvId = process.argv[3]
      if (!deleteEnvId) {
        console.error('❌ Environment ID required')
        process.exit(1)
      }
      deploy.deleteEnvironment(deleteEnvId)
      break
      
    case 'validate':
      const validateEnvId = process.argv[3]
      if (!validateEnvId) {
        console.error('❌ Environment ID required')
        process.exit(1)
      }
      deploy.validateEnvironment(validateEnvId)
      break
      
    default:
      console.error(`❌ Unknown command: ${command}`)
      showHelp()
      process.exit(1)
  }
}