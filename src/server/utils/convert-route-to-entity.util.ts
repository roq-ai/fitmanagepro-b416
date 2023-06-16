const mapping: Record<string, string> = {
  gyms: 'gym',
  members: 'member',
  receptionists: 'receptionist',
  trainers: 'trainer',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
