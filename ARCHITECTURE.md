# Architecture

The host treats remote metadata as untrusted input. Validation produces an immutable manifest read model; route resolution and compatibility checks are pure. Loading concerns stay behind a small registry so retry, timeout, and failure-boundary behavior can evolve without coupling navigation to a bundler.
