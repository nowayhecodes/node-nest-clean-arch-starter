import {
  BlockedByAdminException,
  BlockedByWrongLoginTriesException,
  EmailNotConfirmedException,
  InvalidCredentialsException,
} from '~/shared/domain/exceptions';
import {
  DomainValidationException,
  EmailAlreadyConfirmedException,
} from '~/shared/domain/exceptions';
import { User } from '~/shared/domain/entities/user';

const validProps = {
  id: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'Secret@1',
  passwordHash: 'hashed-secret',
  language: 'en-US',
  timezone: 'UTC',
  securityToken: 'token-123',
  consentDate: new Date('2024-01-01'),
};

describe('User', () => {
  describe('User.create()', () => {
    it('creates a valid user', () => {
      const user = User.create(validProps);
      expect(user.id).toBe(validProps.id);
      expect(user.firstName).toBe(validProps.firstName);
      expect(user.lastName).toBe(validProps.lastName);
      expect(user.email).toBe(validProps.email);
      expect(user.passwordHash).toBe(validProps.passwordHash);
      expect(user.language).toBe(validProps.language);
      expect(user.timezone).toBe(validProps.timezone);
      expect(user.consentDate).not.toBeNull();
      expect(user.emailConfirmedDate).toBeNull();
      expect(user.accessFailedCount).toBe(0);
      expect(user.logoutDate).toBeNull();
    });

    it('records an AccountCreated domain event', () => {
      const user = User.create(validProps);
      const events = user.pullDomainEvents();
      expect(events).toHaveLength(1);
      expect(events[0].eventName).toBe('AccountCreated');
    });

    it('clears domain events after pulling', () => {
      const user = User.create(validProps);
      user.pullDomainEvents();
      expect(user.pullDomainEvents()).toHaveLength(0);
    });

    it('defaults language to en-US and timezone to UTC when not provided', () => {
      const { language: _l, timezone: _t, ...withoutLocale } = validProps;
      const user = User.create(withoutLocale as typeof validProps);
      expect(user.language).toBe('en-US');
      expect(user.timezone).toBe('UTC');
    });

    it('throws DomainValidationException for invalid email', () => {
      expect(() =>
        User.create({ ...validProps, email: 'not-an-email' }),
      ).toThrow(DomainValidationException);
    });

    it('throws DomainValidationException when email exceeds 300 chars', () => {
      const longEmail = `${'a'.repeat(295)}@b.com`;
      expect(() =>
        User.create({ ...validProps, email: longEmail }),
      ).toThrow(DomainValidationException);
    });

    it('throws DomainValidationException for empty firstName', () => {
      expect(() =>
        User.create({ ...validProps, firstName: '' }),
      ).toThrow(DomainValidationException);
    });

    it('throws DomainValidationException when firstName exceeds 200 chars', () => {
      expect(() =>
        User.create({ ...validProps, firstName: 'a'.repeat(201) }),
      ).toThrow(DomainValidationException);
    });

    it('throws DomainValidationException for empty lastName', () => {
      expect(() =>
        User.create({ ...validProps, lastName: '' }),
      ).toThrow(DomainValidationException);
    });

    it('throws DomainValidationException when lastName exceeds 200 chars', () => {
      expect(() =>
        User.create({ ...validProps, lastName: 'a'.repeat(201) }),
      ).toThrow(DomainValidationException);
    });

    it('throws DomainValidationException for weak password', () => {
      expect(() =>
        User.create({ ...validProps, password: 'weak' }),
      ).toThrow(DomainValidationException);
    });

    it('throws DomainValidationException when password exceeds 100 chars', () => {
      const longPassword = `Secret@1${'a'.repeat(93)}`;
      expect(() =>
        User.create({ ...validProps, password: longPassword }),
      ).toThrow(DomainValidationException);
    });
  });

  describe('User.reconstitute()', () => {
    it('rebuilds a user from persistence without validation', () => {
      const avatarDate = new Date('2024-03-01');
      const adminBlockDate = new Date('2024-04-01');
      const user = User.reconstitute({
        id: validProps.id,
        email: validProps.email,
        firstName: validProps.firstName,
        lastName: validProps.lastName,
        passwordHash: validProps.passwordHash,
        securityToken: validProps.securityToken,
        language: validProps.language,
        timezone: validProps.timezone,
        consentDate: validProps.consentDate,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: adminBlockDate,
        avatarImageUploadedDate: avatarDate,
        accessFailedCount: 0,
        logoutDate: null,
      });
      expect(user.email).toBe(validProps.email);
      expect(user.firstName).toBe(validProps.firstName);
      expect(user.adminBlockedDate).toBe(adminBlockDate);
      expect(user.avatarImageUploadedDate).toBe(avatarDate);
      // reconstitute does NOT emit domain events
      expect(user.pullDomainEvents()).toHaveLength(0);
    });
  });

  describe('login()', () => {
    it('succeeds silently on valid credentials', () => {
      const user = User.create(validProps);
      user.pullDomainEvents(); // clear create events
      expect(() =>
        user.login({
          needEmailConfirm: false,
          isPasswordValid: true,
          failedTimesBlock: null,
          blockedAccessTime: null,
        }),
      ).not.toThrow();
      expect(user.accessFailedCount).toBe(0);
    });

    it('throws InvalidCredentialsException when password is invalid', () => {
      const user = User.create(validProps);
      expect(() =>
        user.login({
          needEmailConfirm: false,
          isPasswordValid: false,
          failedTimesBlock: null,
          blockedAccessTime: null,
        }),
      ).toThrow(InvalidCredentialsException);
    });

    it('throws BlockedByAdminException when user is admin-blocked', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: new Date(),
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
      });
      expect(() =>
        user.login({
          needEmailConfirm: false,
          isPasswordValid: true,
          failedTimesBlock: null,
          blockedAccessTime: null,
        }),
      ).toThrow(BlockedByAdminException);
    });

    it('throws BlockedByWrongLoginTriesException when lockout is active', () => {
      const future = new Date(Date.now() + 60_000);
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: future,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
      });
      expect(() =>
        user.login({
          needEmailConfirm: false,
          isPasswordValid: true,
          failedTimesBlock: null,
          blockedAccessTime: null,
        }),
      ).toThrow(BlockedByWrongLoginTriesException);
    });

    it('does not throw lockout when lockoutEndDate is in the past', () => {
      const past = new Date(Date.now() - 60_000);
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: past,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
      });
      expect(() =>
        user.login({
          needEmailConfirm: false,
          isPasswordValid: true,
          failedTimesBlock: null,
          blockedAccessTime: null,
        }),
      ).not.toThrow();
    });

    it('throws EmailNotConfirmedException when email confirmation is required', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
      });
      expect(() =>
        user.login({
          needEmailConfirm: true,
          isPasswordValid: true,
          failedTimesBlock: null,
          blockedAccessTime: null,
        }),
      ).toThrow(EmailNotConfirmedException);
    });

    it('increments accessFailedCount on invalid password when thresholds are set', () => {
      const user = User.create(validProps);
      expect(() =>
        user.login({
          needEmailConfirm: false,
          isPasswordValid: false,
          failedTimesBlock: 5,
          blockedAccessTime: 15,
        }),
      ).toThrow(InvalidCredentialsException);
      expect(user.accessFailedCount).toBe(1);
    });

    it('sets lockoutEndDate when accessFailedCount exceeds failedTimesBlock', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 5,
        logoutDate: null,
      });
      expect(() =>
        user.login({
          needEmailConfirm: false,
          isPasswordValid: false,
          failedTimesBlock: 5,
          blockedAccessTime: 15,
        }),
      ).toThrow(InvalidCredentialsException);
      expect(user.lockoutEndDate).not.toBeNull();
      expect(user.accessFailedCount).toBe(0);
    });
  });

  describe('isBlockedByAdmin()', () => {
    it('does not throw when user is not blocked', () => {
      const user = User.create(validProps);
      expect(() => user.isBlockedByAdmin()).not.toThrow();
    });

    it('throws BlockedByAdminException when user is blocked', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: new Date(),
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
      });
      expect(() => user.isBlockedByAdmin()).toThrow(BlockedByAdminException);
    });
  });

  describe('logout()', () => {
    it('sets logoutDate and updates the entity', () => {
      const user = User.create(validProps);
      const before = new Date();
      user.logout();
      const after = new Date();
      expect(user.logoutDate!.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(user.logoutDate!.getTime()).toBeLessThanOrEqual(after.getTime());
      expect(user.updatedDate).not.toBeNull();
    });
  });

  describe('confirmAccount()', () => {
    it('sets emailConfirmedDate and clears securityToken', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
      });
      user.confirmAccount();
      expect(user.emailConfirmedDate).not.toBeNull();
      expect(user.securityToken).toBeNull();
    });

    it('throws EmailAlreadyConfirmedException when already confirmed', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: new Date(),
        lockoutEndDate: null,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
      });
      expect(() => user.confirmAccount()).toThrow(EmailAlreadyConfirmedException);
    });
  });

  describe('updateSecurityToken()', () => {
    it('updates the security token', () => {
      const user = User.create(validProps);
      user.updateSecurityToken('new-token');
      expect(user.securityToken).toBe('new-token');
    });
  });

  describe('updatePasswordHashAndSecurityToken()', () => {
    it('updates password hash and clears lockout', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: new Date(Date.now() + 60_000),
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 3,
        logoutDate: null,
      });
      user.updatePasswordHashAndSecurityToken({
        password: 'NewPass@9',
        passwordHash: 'new-hash',
        securityToken: null,
      });
      expect(user.passwordHash).toBe('new-hash');
      expect(user.securityToken).toBeNull();
      expect(user.accessFailedCount).toBe(0);
      expect(user.lockoutEndDate).toBeNull();
    });

    it('throws DomainValidationException for a weak new password', () => {
      const user = User.create(validProps);
      expect(() =>
        user.updatePasswordHashAndSecurityToken({
          password: 'weak',
          passwordHash: 'h',
          securityToken: null,
        }),
      ).toThrow(DomainValidationException);
    });
  });

  describe('securityTokenIsValid()', () => {
    it('returns true when tokens match', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
        securityToken: 'abc',
      });
      expect(user.securityTokenIsValid('abc')).toBe(true);
    });

    it('returns false when tokens do not match', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
        securityToken: 'abc',
      });
      expect(user.securityTokenIsValid('xyz')).toBe(false);
    });
  });

  describe('accountIsVerified()', () => {
    it('returns false when email is not confirmed', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
      });
      expect(user.accountIsVerified()).toBe(false);
    });

    it('returns true when email is confirmed', () => {
      const user = User.reconstitute({
        ...validProps,
        email: validProps.email,
        emailConfirmedDate: new Date(),
        lockoutEndDate: null,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
      });
      expect(user.accountIsVerified()).toBe(true);
    });
  });

  describe('anonymize()', () => {
    it('replaces PII with placeholder values, soft-deletes and records AccountDeleted event', () => {
      const user = User.create(validProps);
      user.pullDomainEvents(); // clear AccountCreated
      user.anonymize();
      expect(user.firstName).toBe(`deleted-${user.id}`);
      expect(user.lastName).toBe(`deleted-${user.id}`);
      expect(user.email).toBe(`deleted-${user.id}@deleted.invalid`);
      expect(user.passwordHash).toBe('');
      expect(user.securityToken).toBeNull();
      expect(user.consentDate).toBeNull();
      expect(user.deletedDate).not.toBeNull();
      const events = user.pullDomainEvents();
      expect(events).toHaveLength(1);
      expect(events[0].eventName).toBe('AccountDeleted');
    });
  });
});
