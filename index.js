const { execSync } = require('child_process');
const { globSync } = require('glob');
const path = require('path');

// Find all .eslintrc.json files recursively
const findEslintConfigs = () => {
  return globSync('**/.eslintrc.json', {
    ignore: ['**/node_modules/**', '**/dist/**']
  });
};

// Migrate each config file
const migrateConfigs = () => {
  const configFiles = findEslintConfigs();
  
  console.log(`Found ${configFiles.length} ESLint config files to migrate`);
  
  configFiles.forEach(configPath => {
    console.log(`Migrating: ${configPath}`);
    try {
      console.log(`\nMigrating: ${configPath}`);
      execSync(`npx @eslint/migrate-config "${configPath}"`, {
        stdio: 'inherit'
      });
      console.log(`✅ Successfully migrated ${configPath}`);
    } catch (error) {
      console.error(`❌ Failed to migrate ${configPath}`);
      console.error(error.message);
    }
  });
};

// Run the migration
migrateConfigs();


