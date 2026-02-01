import { v7 as uuidv7 } from "uuid";

export function generateId(): string {
  return uuidv7();
}

module.exports = {
  generateId: generateId,
};
