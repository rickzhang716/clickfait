CREATE TABLE headlines (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  published BOOLEAN ,
  clickbait VARCHAR(20),
);

