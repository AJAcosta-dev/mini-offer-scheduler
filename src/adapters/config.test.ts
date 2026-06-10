import { parseFacilityConfig } from './config';
import { ServiceType } from '../types';

describe('parseFacilityConfig', () => {
  test('transforms facility configuration into schedules', () => {
    const result = parseFacilityConfig({
      BOGOTA: {
        DELIVERY: '08:00',
        PICKUP: '09:00',
      },
      MEDELLIN: {
        DELIVERY: '10:00',
      },
    });

    expect(result).toEqual([
      {
        facilityId: 'BOGOTA',
        serviceType: ServiceType.DELIVERY,
        scheduleTime: '08:00',
      },
      {
        facilityId: 'BOGOTA',
        serviceType: ServiceType.PICKUP,
        scheduleTime: '09:00',
      },
      {
        facilityId: 'MEDELLIN',
        serviceType: ServiceType.DELIVERY,
        scheduleTime: '10:00',
      },
    ]);
  });

  test('returns an empty array when configuration is empty', () => {
    const result = parseFacilityConfig({});

    expect(result).toEqual([]);
  });

  test('handles facilities with only pickup service', () => {
    const result = parseFacilityConfig({
      CALI: {
        PICKUP: '11:00',
      },
    });

    expect(result).toEqual([
      {
        facilityId: 'CALI',
        serviceType: ServiceType.PICKUP,
        scheduleTime: '11:00',
      },
    ]);
  });
});