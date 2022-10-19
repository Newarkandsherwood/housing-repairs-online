# 4. APIs Validate Configuration on Startup

Date: 2022-10-19

## Status

Accepted

## Context

APIs have configuration which they use throughout the code base.  
The configurations are provided to them via sources external to the code base.
It would be best to validate the configuration as early as possible, i.e. during startup to ensure the provided configurations are as expected and usuable.  
This would avoid situations where the configuration was invalid but this wasn't discovered until the specific code that used it was interacted with.

## Decision

Each API will validate configuration values upon startup.  
If the configuration is found to be invalid (i.e. missing, malformed, incorrect type, etc), an appropriate error message should be provided and the API will not startup.

## Consequences

- Validating configuration will add some overhead to adding/modifying configuration.
- Increased codebase for validation code and testing of validation code
