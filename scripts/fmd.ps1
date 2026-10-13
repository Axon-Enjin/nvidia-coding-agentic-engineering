#requires -Version 5.1
[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [ValidateSet('check', 'record', 'cockpit', 'locate')]
    [string]$Command = 'check',
    [string]$Action = '',
    [string]$FmdRoot = ''
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$pythonExecutable = $null
foreach ($candidateName in @('python', 'python3')) {
    $candidateCommand = Get-Command $candidateName -ErrorAction SilentlyContinue
    if ($candidateCommand) { $pythonExecutable = $candidateCommand.Source; break }
}
if (-not $pythonExecutable -and $env:USERPROFILE) {
    $bundledPython = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
    if (Test-Path -LiteralPath $bundledPython -PathType Leaf) { $pythonExecutable = $bundledPython }
}
if (-not $pythonExecutable) { throw 'Python 3 is required. Install it or add an existing interpreter to PATH.' }

$scriptArguments = @((Join-Path $PSScriptRoot 'fmd.py'), $Command)
if ($Action) { $scriptArguments += @('--action', $Action) }
if ($FmdRoot) { $scriptArguments += @('--fmd-root', $FmdRoot) }

Push-Location -LiteralPath $projectRoot
try {
    & $pythonExecutable @scriptArguments
    $commandExitCode = $LASTEXITCODE
}
finally { Pop-Location }
exit $commandExitCode
