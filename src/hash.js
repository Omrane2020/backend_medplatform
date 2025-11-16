//comande :node hash.js
const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'azerty';
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
}

generateHash();
//insert admin
//INSERT INTO users (firstName, lastName, email, password, role, isActive, createdAt, updatedAt)
//VALUES ('admin', 'medplatfrom', 'admin@example.com', '$2b$10$KIX/3fLZ5p0wC8U3...', 'admin', true, NOW(), NOW());
/*

INSERT INTO users (firstName, lastName, email, password, role, isActive, createdAt, updatedAt) VALUES ('admin', 'medplatfrom', 'admin@example.com', '$2b$10$hxonCYLBm.C.WrwTkPI/i.g2.rN2EkIypuo/H/LqfsM4AgTUNTetu', 'admin', true, NOW(), NOW());
*/
