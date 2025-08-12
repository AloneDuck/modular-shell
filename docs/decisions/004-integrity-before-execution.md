# integrity before execution

Status: accepted

Require HTTPS and sha384 metadata before accepting runtime entries.

## Consequences

- The constraint is verified by runtime or test contracts.
- Exceptions require an explicit review and migration note.
- The public behavior remains observable without repository-specific tooling.
