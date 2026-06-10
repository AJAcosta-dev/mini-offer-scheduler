import {
  buildScheduledMessages,
} from './OfferScheduler';

import {
  ServiceType,
} from '../../types';

describe('buildScheduledMessages', () => {
  test('builds scheduled messages', () => {
    const result =
        buildScheduledMessages([
          {
            facilityId: 'BOGOTA',
            serviceType:
              ServiceType.DELIVERY,
            scheduleTime: '08:00',
          },
          {
            facilityId: 'CALI',
            serviceType:
              ServiceType.PICKUP,
            scheduleTime: '09:00',
          },
        ]);

    expect(result).toHaveLength(2);

    expect(
      result[0].payload.facilityId,
    ).toBe('BOGOTA');

    expect(
      result[1].payload.facilityId,
    ).toBe('CALI');

    expect(
      result[0].delaySeconds,
    ).toBe(0);
  });
});