const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Set the path to the production environment configuration file
const productionConfigPath = path.join(__dirname, '..', 'config', 'production.json');
const productionConfig = JSON.parse(fs.readFileSync(productionConfigPath));

// Set the path to the directory containing the built platform code
const platformBuildPath = path.join(__dirname, '..', 'dist');

// Set the path to the deployment script
const deploymentScriptPath = path.join(__dirname, 'deploy.ps1');

// Set the path to the directory where the deployment script will be uploaded
const deploymentScriptUploadPath = path.join(platformBuildPath, 'deploy.ps1');

// Set the path to the log file
const logFilePath = path.join(platformBuildPath, 'deploy.log');

// Write the deployment script
const deployScript = `
# Set the path to the production environment configuration file
$configPath = "${productionConfigPath}"

# Set the path to the directory containing the built platform code
$platformBuildPath = "${platformBuildPath}"

# Set the path to the deployment script
$deploymentScriptPath = "${deploymentScriptUploadPath}"

# Set the path to the log file
$logFilePath = "${logFilePath}"

# Load the production environment configuration
$config = ConvertFrom-Json (Get-Content $configPath)

# Copy the platform code to the production environment
Copy-Item -Path $platformBuildPath -Destination $config.deploy.targetPath -Recurse -Force

# Upload the deployment script to the production environment
Copy-Item -Path $deploymentScriptPath -Destination $config.deploy.scriptUploadPath -Force

# Execute the deployment script on the production environment
Invoke-Command -ComputerName $config.deploy.targetServer -FilePath $config.deploy.scriptUploadPath
`;

// Write the deployment script to the file
fs.writeFileSync(deploymentScriptPath, deployScript);

// Upload the deployment script to the production environment
exec(`powershell.exe -Command "Set-Content -Path ${deploymentScriptUploadPath} -Value $([System.IO.File]::ReadAllText('${deploymentScriptPath}'))"`);

// Execute the deployment script on the production environment
exec(`powershell.exe -Command "Invoke-Command -ComputerName ${productionConfig.deploy.targetServer} -FilePath ${deploymentScriptUploadPath}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing deployment script: ${error}`);
    return;
  }

  console.log(stdout);
  console.error(stderr);

  // Remove the deployment script from the production environment
  exec(`powershell.exe -Command "Remove-Item -Path ${deploymentScriptUploadPath}"`);
});
