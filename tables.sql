CREATE TABLE users(
    id serial PRIMARY KEY,
    name text NOT NULL,
    picture text NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT NOW() NOT NULL
);

CREATE TABLE sessions(
    id serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES users(id),
    token text UNIQUE NOT NULL,
    "createdAt" timestamp with time zone DEFAULT NOW() NOT NULL,
    status boolean DEFAULT true NOT NULL
);