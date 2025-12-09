package migrations

import "embed"

// Files exposes all SQL migration files as an embedded filesystem.
//
//go:embed *.sql
var Files embed.FS
