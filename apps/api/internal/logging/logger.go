package logging

import (
	"io"
	"os"
	"strings"
	"time"

	"github.com/rs/zerolog"
)

// Config controls how the zerolog logger is configured.
type Config struct {
	Output        io.Writer
	Level         string
	PrettyConsole bool
}

// New builds a zerolog.Logger according to the supplied configuration.
func New(cfg Config) zerolog.Logger {
	writer := cfg.Output
	if writer == nil {
		writer = os.Stdout
	}

	zerolog.TimeFieldFormat = time.RFC3339Nano
	zerolog.TimestampFieldName = "ts"

	level := parseLevel(cfg.Level)

	if cfg.PrettyConsole {
		writer = zerolog.ConsoleWriter{
			Out:        writer,
			TimeFormat: time.RFC3339,
		}
	}

	logger := zerolog.New(writer).Level(level).With().Timestamp().Logger()
	return logger
}

// parseLevel converts a string level into a zerolog Level, defaulting to Info.
func parseLevel(input string) zerolog.Level {
	if input == "" {
		return zerolog.InfoLevel
	}

	lvl, err := zerolog.ParseLevel(strings.ToLower(strings.TrimSpace(input)))
	if err != nil {
		return zerolog.InfoLevel
	}

	return lvl
}
