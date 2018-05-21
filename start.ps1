Param(
  [string]$serverModuleName
)
. .\shared.ps1
$startFilePath="node_modules\$serverModuleName\$serverModuleName.start.js"
[bool]$exists=Test-Path $startFilePath
if ($exists -eq $true){
    node $startFilePath
    $LASTEXITCODE=$true
}else{
    $LASTEXITCODE=$false
}