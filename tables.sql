CREATE TABLE users(
    id serial PRIMARY KEY,
    name text NOT NULL,
    image text NOT NULL,
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

CREATE TABLE hashtags(
    id serial PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE postshashtags(
    id serial PRIMARY KEY,
    "postId" integer NOT NULL REFERENCES posts(id),
    "hashtagId" integer NOT NULL REFERENCES hashtags(id)
);

CREATE TABLE posts(
    id serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES users(id),
    url text NOT NULL,
    message text,
    "createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'
);

CREATE TABLE likes(
    id serial PRIMARY KEY,
    "whoLiked" integer NOT NULL REFERENCES users(id),
    "postId" integer NOT NULL REFERENCES posts(id)
);

CREATE TABLE postshashtags(
    id serial PRIMARY KEY,
    "postId" integer NOT NULL REFERENCES posts(id),
    "hashtagId"integer REFERENCES hashtags(id),
    "createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()'
);