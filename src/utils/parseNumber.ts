const parseNumber = (s: string): string => {
    const regExp = /\d/g;
    const result = s.match(regExp);
    return result ? result.join('') : '';
};

export { parseNumber }
