// adding constraints for user roles
export enum UserRoles {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  WORKER = 'worker',
  CUSTOMER = 'customer',
  GUEST = 'guest',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export enum WorkerAvailabilityStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  BUSY = 'busy',
}
