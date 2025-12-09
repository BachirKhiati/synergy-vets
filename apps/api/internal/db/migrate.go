package db

import (
	"database/sql"

	"github.com/pressly/goose/v3"

	"github.com/synergyvets/platform/db/migrations"
)

// Migrate applies all up migrations using goose.
func Migrate(database *sql.DB) error {
	goose.SetTableName("schema_migrations")
	if err := goose.SetDialect("postgres"); err != nil {
		return err
	}

	goose.SetBaseFS(migrations.Files)

	return goose.Up(database, ".")
}
