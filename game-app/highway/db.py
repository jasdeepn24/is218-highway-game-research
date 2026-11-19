import sqlite3
from flask import current_app, g

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS runs (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    started_at REAL NOT NULL,
    completed_at REAL,
    score INTEGER CHECK(score BETWEEN 0 AND 2000),
    CHECK ((completed_at IS NULL AND score IS NULL) OR
           (completed_at IS NOT NULL AND score IS NOT NULL))
);
CREATE UNIQUE INDEX IF NOT EXISTS one_pending_run ON runs(user_id)
    WHERE completed_at IS NULL;
"""


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(current_app.config['DATABASE'], timeout=10)
        g.db.row_factory = sqlite3.Row
        g.db.execute('PRAGMA foreign_keys = ON')
    return g.db


def close_db(error=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    db = get_db()
    db.executescript(SCHEMA)
    db.commit()
