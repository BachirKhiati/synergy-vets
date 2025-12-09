package store

import (
	"context"
	"database/sql"

	"github.com/synergyvets/platform/internal/queries"
)

// Store wraps the generated SQLC queries and exposes helpers for transactional workflows.
type Store struct {
	db      *sql.DB
	queries *queries.Queries
}

// New creates a Store backed by the provided sql.DB handle.
func New(db *sql.DB) *Store {
	return &Store{
		db:      db,
		queries: queries.New(db),
	}
}

// Queries returns the underlying SQLC queries instance.
func (s *Store) Queries() *queries.Queries {
	return s.queries
}

// WithTx executes the supplied function within a database transaction using repeatable read isolation.
func (s *Store) WithTx(ctx context.Context, fn func(*queries.Queries) error) error {
	tx, err := s.db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelRepeatableRead})
	if err != nil {
		return err
	}

	q := queries.New(tx)

	if err := fn(q); err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			return rbErr
		}
		return err
	}

	return tx.Commit()
}
