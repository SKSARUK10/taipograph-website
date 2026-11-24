import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry } from '../src/utils/validate.js';

const good = { name: ' Asha Rao ', email: 'ASHA@Brand.com ', company: 'Brand Co', service: 'Free preflight review', message: 'Hello\nworld' };

test('accepts and normalises a good enquiry', () => {
  const { values, errors } = validateEnquiry(good);
  assert.deepEqual(errors, {});
  assert.equal(values.name, 'Asha Rao');
  assert.equal(values.email, 'asha@brand.com');
  assert.equal(values.message, 'Hello\nworld');
});

test('requires name and a valid email', () => {
  const { errors } = validateEnquiry({ ...good, name: '  ', email: 'nope' });
  assert.ok(errors.name);
  assert.ok(errors.email);
});

test('rejects unknown service values', () => {
  assert.ok(validateEnquiry({ ...good, service: 'Hack' }).errors.service);
});

test('company and message are optional but length-limited', () => {
  assert.deepEqual(validateEnquiry({ ...good, company: '', message: '' }).errors, {});
  assert.ok(validateEnquiry({ ...good, message: 'x'.repeat(5001) }).errors.message);
  assert.ok(validateEnquiry({ ...good, company: 'x'.repeat(121) }).errors.company);
});

test('strips control characters', () => {
  const { values } = validateEnquiry({ ...good, name: 'A\u0000sha\u0007' });
  assert.equal(values.name, 'Asha');
});

test('tolerates a missing body', () => {
  assert.ok(Object.keys(validateEnquiry(undefined).errors).length >= 2);
});
