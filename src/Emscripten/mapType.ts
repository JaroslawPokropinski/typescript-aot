export default function mapType(t?: string, targs?: Array<string>): string {
    if (t !== undefined) {
      switch (t) {
        case 'Int':
          return 'int';
        case 'Float':
          return 'double';
        case 'CArray':
          if (!targs) {
            throw new Error('CArray must have generic');
          }
          return `std::vector<${mapType(targs[0])}>*`;
        default:
          throw new Error('Unknown type');
      }
    }
    return 'void';
  }