import {
  FacilitySchedule,
  ServiceType,
} from '../types';

export type FacilityConfig = {
  [facilityId: string]: {
    DELIVERY?: string;
    PICKUP?: string;
  };
};

/**
   * Transforms raw facility configuration into domain objects.
   *
   * Example input:
   * {
   *   BOGOTA: {
   *     DELIVERY: "08:00",
   *     PICKUP: "09:00"
   *   },
   *   MEDELLIN: {
   *     DELIVERY: "10:00"
   *   }
   * }
   *
   * Example output:
   * [
   *   {
   *     facilityId: "BOGOTA",
   *     serviceType: ServiceType.DELIVERY,
   *     scheduleTime: "08:00"
   *   },
   *   {
   *     facilityId: "BOGOTA",
   *     serviceType: ServiceType.PICKUP,
   *     scheduleTime: "09:00"
   *   }
   * ]
   */
export function parseFacilityConfig(
  config: FacilityConfig,
): FacilitySchedule[] {
  const schedules: FacilitySchedule[] = [];

  for (const [facilityId, services] of Object.entries(config)) {
    if (services.DELIVERY) {
      schedules.push({
        facilityId,
        serviceType: ServiceType.DELIVERY,
        scheduleTime: services.DELIVERY,
      });
    }

    if (services.PICKUP) {
      schedules.push({
        facilityId,
        serviceType: ServiceType.PICKUP,
        scheduleTime: services.PICKUP,
      });
    }
  }

  return schedules;
}