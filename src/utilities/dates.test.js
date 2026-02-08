import { describe, it, expect } from 'vitest';
import {
  getDaysInMonth,
  isLeapYear,
  getDailyInterestRate,
  getDateString,
} from './dates';

describe('dates utilities', () => {
  describe('getDaysInMonth', () => {
    it('should return 31 days for January', () => {
      expect(getDaysInMonth(24, 0)).toBe(31);
    });

    it('should return 28 days for February in non-leap year', () => {
      expect(getDaysInMonth(23, 1)).toBe(28);
    });

    it('should return 29 days for February in leap year', () => {
      expect(getDaysInMonth(24, 1)).toBe(29);
    });

    it('should return 30 days for April', () => {
      expect(getDaysInMonth(24, 3)).toBe(30);
    });

    it('should return 31 days for December', () => {
      expect(getDaysInMonth(24, 11)).toBe(31);
    });
  });

  describe('isLeapYear', () => {
    it('should return true for leap year 2024 (24)', () => {
      expect(isLeapYear(24)).toBe(true);
    });

    it('should return false for non-leap year 2023 (23)', () => {
      expect(isLeapYear(23)).toBe(false);
    });

    it('should return true for leap year 2020 (20)', () => {
      expect(isLeapYear(20)).toBe(true);
    });

    it('should return false for non-leap year 2021 (21)', () => {
      expect(isLeapYear(21)).toBe(false);
    });
  });

  describe('getDailyInterestRate', () => {
    it('should calculate daily interest rate for non-leap year', () => {
      const result = getDailyInterestRate(6.25, 23);
      expect(result).toBeCloseTo(0.0625 / 365, 10);
    });

    it('should calculate daily interest rate for leap year', () => {
      const result = getDailyInterestRate(6.25, 24);
      expect(result).toBeCloseTo(0.0625 / 366, 10);
    });

    it('should handle zero interest rate', () => {
      const result = getDailyInterestRate(0, 23);
      expect(result).toBe(0);
    });

    it('should handle high interest rate', () => {
      const result = getDailyInterestRate(25, 23);
      expect(result).toBeCloseTo(0.25 / 365, 10);
    });
  });

  describe('getDateString', () => {
    it('should format single digit month with leading zero', () => {
      expect(getDateString(24, 0)).toBe('01/2024');
    });

    it('should format double digit month without leading zero', () => {
      expect(getDateString(24, 11)).toBe('12/2024');
    });

    it('should format September correctly', () => {
      expect(getDateString(23, 8)).toBe('09/2023');
    });

    it('should format October correctly', () => {
      expect(getDateString(23, 9)).toBe('10/2023');
    });

    it('should handle year 20', () => {
      expect(getDateString(20, 5)).toBe('06/2020');
    });
  });
});
