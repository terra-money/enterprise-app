export const hasChangedFields = (msg: Record<string, any>) => Object.values(msg).some((value) => value !== 'no_change');
