export const snakeToCamelCase = <ReturnType>(obj: { [key: string]: any }): ReturnType => {
    const converted: { [key: string]: any } = {};
  
    for (const key in obj) {
      const camelKey = key
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) =>
          group.toUpperCase().replace('-', '').replace('_', '')
        );
      converted[camelKey] = obj[key];
    }
  
    return converted as ReturnType;
};