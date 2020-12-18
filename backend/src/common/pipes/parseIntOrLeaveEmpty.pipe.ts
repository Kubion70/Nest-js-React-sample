import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ParseIntOrLeaveEmptyPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata): any {
    return !isNaN(value) ? parseInt(value) : null;
  }
}
