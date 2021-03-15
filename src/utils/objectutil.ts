export const unmarshalMap = <T = unknown>(data: unknown, struct: Struct) => {
  const unmarshaledData: unknown = {};

  const keys = Object.keys(data);
  for (const key of keys) {
    let unmarshalKey = struct[key];

    if (unmarshalKey && typeof data[key] !== 'undefined') {
      let value = data[key];

      if (typeof unmarshalKey !== 'string') {
        const result = unmarshalKey(data[key]);
        unmarshalKey = result.key;
        value = result.value;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (unmarshaledData as any)[unmarshalKey] = value;
    }
  }

  return JSON.parse(JSON.stringify(unmarshaledData)) as T;
};

type Formatter = (value: unknown) => { key: string; value: unknown };
type Struct = { [key: string]: string | Formatter };
