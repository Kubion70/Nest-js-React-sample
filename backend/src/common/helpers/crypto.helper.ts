import { createHash } from 'crypto';

export class CryptoHelper {
  static sha256(input: string) {
    return createHash('sha256').update(input).digest('hex');
  }
}
