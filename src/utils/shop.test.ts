import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateBdPhone,
  validateTrxId,
  toBengaliDigits,
  formatBdt,
  calculateDeliveryFee,
  calculateCartTotals,
} from './shop';
import { CartItem } from '../types';

test('validateBdPhone recognizes valid Bangladeshi numbers', () => {
  // 11 digits standard
  assert.equal(validateBdPhone('01712345678'), true);
  assert.equal(validateBdPhone('01812345678'), true);
  assert.equal(validateBdPhone('01912345678'), true);
  assert.equal(validateBdPhone('01312345678'), true);
  assert.equal(validateBdPhone('01412345678'), true);
  assert.equal(validateBdPhone('01512345678'), true);
  assert.equal(validateBdPhone('01612345678'), true);

  // With +88 and 88 prefix
  assert.equal(validateBdPhone('+8801712345678'), true);
  assert.equal(validateBdPhone('8801812345678'), true);

  // Formatted with spaces and hyphens
  assert.equal(validateBdPhone('01712-345678'), true);
  assert.equal(validateBdPhone('+88 01712 345678'), true);
});

test('validateBdPhone rejects invalid phone numbers', () => {
  assert.equal(validateBdPhone(''), false);
  assert.equal(validateBdPhone('01212345678'), false); // invalid operator prefix (012)
  assert.equal(validateBdPhone('01012345678'), false); // invalid operator prefix (010)
  assert.equal(validateBdPhone('0171234567'), false);  // too short (10 digits)
  assert.equal(validateBdPhone('017123456789'), false); // too long (12 digits)
  assert.equal(validateBdPhone('12345678901'), false); // doesn't start with 01
  assert.equal(validateBdPhone('abcdefghijk'), false);
});

test('validateTrxId validates transaction IDs', () => {
  assert.equal(validateTrxId('9J28DA1002'), true);
  assert.equal(validateTrxId('BL84K291'), true);
  assert.equal(validateTrxId('ABC12345'), true);

  // Too short or invalid chars
  assert.equal(validateTrxId(''), false);
  assert.equal(validateTrxId('12345'), false); // too short (< 8 chars)
  assert.equal(validateTrxId('TRX!#@%123'), false); // special characters
});

test('toBengaliDigits converts English digits to Bengali digits', () => {
  assert.equal(toBengaliDigits('0123456789'), '০১২৩৪৫৬৭৮৯');
  assert.equal(toBengaliDigits(1450), '১৪৫০');
});

test('formatBdt formats currency correctly in EN and BN', () => {
  assert.equal(formatBdt(1450, 'en'), '৳1,450');
  assert.equal(formatBdt(1450, 'bn'), '৳ ১,৪৫০');
});

test('calculateDeliveryFee applies correct rate for Dhaka and outside Dhaka', () => {
  // Inside Dhaka standard
  assert.equal(calculateDeliveryFee('Dhaka', 1000), 70);
  assert.equal(calculateDeliveryFee('ঢাকা', 1000), 70);

  // Outside Dhaka standard
  assert.equal(calculateDeliveryFee('Chattogram', 1000), 130);
  assert.equal(calculateDeliveryFee('Sylhet', 1000), 130);

  // Free delivery threshold (>= 3000)
  assert.equal(calculateDeliveryFee('Chattogram', 3200), 0);
  assert.equal(calculateDeliveryFee('Dhaka', 3000), 0);
});

test('calculateCartTotals calculates subtotal, delivery, and threshold remaining', () => {
  const sampleItems: CartItem[] = [
    {
      id: 'item-1',
      productId: 'p-1',
      name: { en: 'Panjabi', bn: 'পাঞ্জাবি' },
      price: 1500,
      image: '/test.jpg',
      quantity: 1,
    },
    {
      id: 'item-2',
      productId: 'p-2',
      name: { en: 'Wallet', bn: 'ওয়ালেট' },
      price: 800,
      image: '/test.jpg',
      quantity: 1,
    },
  ];

  const resultDhaka = calculateCartTotals(sampleItems, 'Dhaka', 3000);
  assert.equal(resultDhaka.subtotal, 2300);
  assert.equal(resultDhaka.deliveryFee, 70);
  assert.equal(resultDhaka.grandTotal, 2370);
  assert.equal(resultDhaka.totalItemsCount, 2);
  assert.equal(resultDhaka.remainingForFreeDelivery, 700);
  assert.equal(resultDhaka.isFreeDelivery, false);

  const resultFree = calculateCartTotals(
    [
      ...sampleItems,
      {
        id: 'item-3',
        productId: 'p-3',
        name: { en: 'Earbuds', bn: 'ইয়ারবাডস' },
        price: 1000,
        image: '/test.jpg',
        quantity: 1,
      },
    ],
    'Sylhet',
    3000
  );
  assert.equal(resultFree.subtotal, 3300);
  assert.equal(resultFree.deliveryFee, 0);
  assert.equal(resultFree.grandTotal, 3300);
  assert.equal(resultFree.isFreeDelivery, true);
});
