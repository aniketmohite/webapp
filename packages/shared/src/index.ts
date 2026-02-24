// @webapp/shared - business logic, types, API client

export const APP_NAME = 'Webapp';

export interface User {
  id: string;
  name: string;
  email: string;
}

export function greeting(name: string): string {
  return `Hello, ${name}! Welcome to ${APP_NAME}.`;
}
