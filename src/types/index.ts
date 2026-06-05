export enum ServiceType {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}

export interface FacilitySchedule {
  facilityId: string;
  serviceType: ServiceType;
  scheduleTime: string;
}

export interface SchedulerPayload {
  facilityId: string;
  serviceType: ServiceType;
  scheduledAt: string;
}